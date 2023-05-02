const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

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

app.listen(4000);