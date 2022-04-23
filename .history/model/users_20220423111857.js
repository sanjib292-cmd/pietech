const mongoose = require('mongoose');
const Joi= require('joi');
// const jwt = require('jsonwebtoken');
// const config = require('config')


const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true

    },
    // loc: Object({
    //     type: { type: String, default: "Point" },
    //     coordinates: { type: [Number], default: [0.0, 0.0], },
    // }),

    // fcmToken: {
    //     type: String
    // },
    age:{
        type:Number,
        required:true
    }


});

module.exports.User = mongoose.model('Users', userSchema);