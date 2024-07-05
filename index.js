import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

import {registerValidation} from './validations/auth.js'

import UserModel from './models/User.js';

mongoose.connect(
  'mongodb+srv://tesliamm:qLkTRVMIeaq6VsAW@cluster0.ob0okgi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
).then(() => console.log('DB ok'))
.catch(() => console.log('DB error', err));

const app = express();

app.use(express.json());

app.post('/auth/register', registerValidation, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }

    const doc = new UserModel({
        email: req.body.email,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
        passwordHash: req.body.avatarUrl,
    });

    res.json({ 
        success: true,
    })
});

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server OK');
});
