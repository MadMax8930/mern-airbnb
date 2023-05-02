const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const app = express();

app.use(express.json());
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
      const newRegisteredUser = await User.create({
         name,
         email,
         password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
      });
      res.json(newRegisteredUser);
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
         jwt.sign({ email: foundUser.email, id: foundUser._id }, process.env.JWT_SECRET, {}, (err, token) => {
            if (err) throw err;
            res.cookie('myCookie', token).json('Password ok');  // options: { secure: false, sameSite: 'none'}
         });
      } else {
         res.status(422).json('Password not ok');
      }
   } else {
      res.json('User not found');
   }
});

app.listen(4000);