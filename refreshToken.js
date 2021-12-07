const mongoose = require('mongoose');
const schema = mongoose.Schema;
const refreshToken = new schema({
    refreshToken:{
        type:String,
        required:false
    }
},{timestamps:true});
const refresh = mongoose.model('refreshTokens',refreshToken);
module.exports = refresh;