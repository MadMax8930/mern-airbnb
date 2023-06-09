const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const imageUploader = require('multer');
const fs = require('fs');
const User = require('./models/User');
const Place = require('./models/Place');
const Booking = require('./models/Booking');

require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
   credentials: true,
   origin: 'http://127.0.0.1:5173'
}));

mongoose.connect(process.env.MONGO_URL);

// Helper

function getUserData(req) {
   return new Promise((resolve, reject) => {
      jwt.verify(req.cookies.token, process.env.JWT_SECRET, {}, async (err, userData) => {
         if (err) throw err;
         resolve(userData); 
      }); 
   });
}

// Endpoints

app.get('/test', (req,res) => {
   res.json(('test ok'))
});

app.post('/register', async (req,res) => {
   const { name, email, password } = req.body;
   try {
      const newUser = await User.create({
         name,
         email,
         password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
      });
      res.json(newUser);
   } catch (e) {
      res.status(422).json(e);
   }
});

app.post('/login', async (req,res) => {
   const { email, password } = req.body;
   const foundUser = await User.findOne({ email });
   if (foundUser) {
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);
      // create jwt and respond with a cookie
      if (passwordCorrect) {
         jwt.sign({ 
            id: foundUser._id, 
            email: foundUser.email, 
            name: foundUser.name 
         }, process.env.JWT_SECRET, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json(foundUser);
         });
      } else {
         res.status(422).json('Password not correct');
      }
   } else {
      res.status(400).json('User not found').end();
   }
});

app.get('/profile', (req,res) => {
   const { token } = req.cookies;
   if (token) {
      // Decrypt token with the secret key
      jwt.verify(token, process.env.JWT_SECRET, {}, (err, userData) => {
         if (err) throw err;
         res.json(userData);
      });
   } else {
      res.json(null);
   }
});

app.post('/logout', (req,res) => {
   res.cookie('token', '').json(true);
});

app.post('/upload-by-link', async (req,res) => {
   const { link } = req.body;
   // Grab image and drop it in the uploads
   const newImageName = 'photo' + Date.now() + '.jpg';
   await imageDownloader.image({
      url: link,
      dest: __dirname + '/uploads/' + newImageName
   });
   res.json(newImageName);
});

const photosMiddleware = imageUploader({ dest: 'uploads/'});
app.post('/upload-by-device', photosMiddleware.array('photos', 100), (req,res) => {
   const uploadedFiles = [];
   // Rename each file (oldPath, newPath)
   for (let i = 0; i < req.files.length; i++) {
      const { path, originalname } = req.files[i];
      const parts = originalname.split('.');
      const extension = parts[parts.length - 1];
      const newPath = path + '.' + extension;
      fs.renameSync(path, newPath);
      uploadedFiles.push(newPath.replace('uploads/', ''));
   }
   res.json(uploadedFiles);
});

app.post('/user-places', async (req,res) => {
   const { token } = req.cookies;
   const { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;
   jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
      if (err) throw err;
      const newPlace = await Place.create({ owner: userData.id, title, address, photos: addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price });
      res.json(newPlace);
   });
});

app.put('/user-places', async (req,res) => {
   const { token } = req.cookies;
   const { id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;
   jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
      if (err) throw err;
      const placeFromDB = await Place.findById(id);
      if (userData.id === placeFromDB.owner.toString()) {
         placeFromDB.set({ title, address, photos: addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price });
         await placeFromDB.save();
         res.json('Your record has been updated');
      }
   });
});

app.get('/user-places', async (req,res) => {
   const { token } = req.cookies;
   jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
      if (err) throw err;
      const allUserPlaces = await Place.find({ owner: userData.id });
      res.json(allUserPlaces);
   });
});

app.get('/public-places', async (req,res) => {
   const allPossiblePlaces = await Place.find();
   res.json(allPossiblePlaces);
});

app.get('/public-places/:id', async (req,res) => {
   const { id } = req.params;
   const thatOnePlace = await Place.findById(id);
   res.json(thatOnePlace);
});

app.post('/bookings', async (req,res) => {
   const userData = await getUserData(req);
   const { place, checkIn, checkOut, numOfGuests, name, phone, price } = req.body;
   Booking.create({
      place, checkIn, checkOut, numOfGuests, name, phone, price, user: userData.id
   }).then((newBooking) => {
      res.json(newBooking);
   }).catch((err) => {
      throw err;
   });
});

app.get('/bookings', async (req,res) => {
   const userData = await getUserData(req);
   const userBookings = await Booking.find({ user: userData.id }).populate('place');
   res.json(userBookings);
});

app.listen(4000);