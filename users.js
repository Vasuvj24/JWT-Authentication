const mongoose = require('mongoose');
const schema = mongoose.Schema;
const userPass = new schema({
    UserName:{
        type:String,
        required:true
    } ,
    Password:{
        type:String,
        required:true
    } ,
    Token:{
        type:String,
        required:false
    }
},{timestamps:true});
const users = mongoose.model('userPas',userPass);
module.exports = users;