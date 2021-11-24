//include require field 
const express = require('express');
const app = express()
require('dotenv').config()
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const users = require('./users')
app.use(express.json());
//connecting a database 
mongoose.connect(process.env.REACT_APP_API_KEY, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => {
        console.log("developed connection");
    }).catch(Error => {
        console.log(Error);
    }
)
//making functions
let UserName,Password;
//server
app.listen(3000);
// app.get('/add-id-pass', (req, res) => {
//     const idPass = new users({
//         UserName: 'Vasudi5656',
//         Password: 'vasudi18989'
//     });
//     idPass.save().then((result) => {
//         res.send(result)
//     }).catch((err) => console.log(err))
// })
// app.get('/login',random=async(req, res)=>{
//     await users.find().then((results) => {
//         results.forEach(each => {
//             if (each.UserName === "Admin" && each.Password === "vasudi1") {
//                 console.log("You are logged in");
//                 UserName=each.UserName;
//                 Password=each.Password;
//             }
//         })
//     }).catch((err) => {
//         console.log(err)
//     })
//     const presentAccessToken=jwt.sign({UserName,Password},process.env.REACT_APP_ACCESS_TOKEN);
//     res.json(presentAccessToken)
// })
app.post('/JWT',(req,res)=>{
    UserName=req.body.UserName
    Password=req.body.Password
    const presentAccessToken=jwt.sign({UserName,Password},process.env.REACT_APP_ACCESS_TOKEN);
    const user = new users({
    UserName:UserName,
    Password:Password,
    Token:presentAccessToken
    })

    user.save().then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log(err);
    })
})