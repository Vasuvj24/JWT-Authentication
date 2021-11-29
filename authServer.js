//include require field 
require('dotenv').config() 
const express = require('express');
const app = express()
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
// mongoose.connect(process.env.REACT_APP_TOKEN_KEY,{useNewUrlParser:true , useUnifiedTopology:true})
// .then((res)=>{
//     console.log("developed connection 2");
// }).catch((error)=>{
//     console.log(error);
// })
//variable defination

let userNameAuth, passwordAuth, accessToken;

//functions

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.send('you dont have a token').status(401)
    const user = { userNameAuth, passwordAuth }
    jwt.verify(token, process.env.REACT_APP_ACCESS_TOKEN, (err, user) => {
        if (err) return res.status(403).send("Invalid Token Login Again")
        req.body.userName = user.userNameAuth;
        req.body.password = user.passwordAuth;
        next()
    })
}
//server
app.listen(4000);
//tries to register itself
function generateAccessToken(userNameAuth, passwordAuth) {
    return jwt.sign({ userNameAuth, passwordAuth }, process.env.REACT_APP_ACCESS_TOKEN, { expiresIn: '20s' })
}
//logging in
app.post('/user/login', async (req, res) => {
    // let userNameAuth,passwordAuth;   
    await users.find().then((result) => {
        result.forEach(each => {
            if (each.userName === req.body.userName) {
                passwordAuth = each.password;
                userNameAuth = each.userName;
            }
            else {
                res.send('username field incorrect')
            }
        })
    }).catch((err) => { console.log("loggin catch error") })
    try {
        if(await bcrypt.compare(req.body.password, passwordAuth)){ 
            accessToken = generateAccessToken({ userNameAuth, passwordAuth });
            refreshToken = jwt.sign({ userNameAuth, passwordAuth }, process.env.REACT_APP_ACCESS_TOKEN_REFRESH)
            res.send("logged in Succesfully your id pass is correct "+accessToken+"         "+refreshToken)
        }
        else{ res.send("your password is wrong")}
        // res.send({ user: userNameAuth, pass: passwordAuth, at: accessToken, rt: refreshToken })
    } catch {
        res.send('Incorrect Password');
    }
})
//tries to access another feature which will check if it has access to it or not
app.post('/another-page', authenticateToken, (req, res) => {
    users.find().then((result) => {
        result.forEach(each => {
            if (each.userName === userNameAuth) {
                res.status(200).send('authorized user '+userNameAuth);
            }
        })
    }).catch((err)=>{
        res.status(400).send("You are Not Authorized");
    })
})
