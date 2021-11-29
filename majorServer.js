//include require field 
const express = require('express');
const app = express()
require('dotenv').config()
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const users = require('./users')
const bcrypt = require('bcrypt');
app.use(express.json());

//connecting a database 

mongoose.connect(process.env.REACT_APP_API_KEY, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => {
        console.log("developed connection");
    }).catch(Error => {
        console.log(Error);
    }
    )

//variable defination

let userNameAuth, passwordAuth, accessToken;

//server
app.listen(3000);
//tries to register itself
app.post('/user', async (req, res) => {
    try {
        // const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // console.log(salt);
        console.log(hashedPassword);
        const idPass = new users({
            userName: req.body.userName,
            password: hashedPassword
        });
        idPass.save().then((result) => {
            res.status(201).send(result)
        }).catch((err) => console.log(err))
    } catch {
        res.status(500).send()
    }
})
//logging in
