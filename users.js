const mongoose = require('mongoose');
const schema = mongoose.Schema;
const userPass = new schema({
    userName:{
        type:String,
        required:true
    } ,
    password:{
        type:String,
        required:true
    }
},{timestamps:true});
const users = mongoose.model('userPas',userPass);
module.exports = users;