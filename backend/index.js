const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
   credentials: true,
   origin: 'http://127.0.0.1:5173'
}));

mongoose.connect(process.env.MONGO_URL);

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

app.listen(4000);