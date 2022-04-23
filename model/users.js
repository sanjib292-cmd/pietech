const mongoose = require('mongoose');
const Joi= require('joi');
// const jwt = require('jsonwebtoken');



const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    age:{
        type:Number,
        required:true
    }


});

module.exports.User = mongoose.model('Users', userSchema);