const mongoose = require('mongoose');
const Joi= require('joi');
const jwt = require('jsonwebtoken');
const config = require('config')


const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    friends: { type: [mongoose.Schema.Types.ObjectId], ref: 'Users' },

    imgurl: {
        type: String,
    },
    password: {
        type: String,
        required: true

    },
    phone: {
        type: Number,
        required: true,
        unique:true
    },
    loc: Object({
        type: { type: String, default: "Point" },
        coordinates: { type: [Number], default: [0.0, 0.0], },
    }),

    fcmToken: {
        type: String
    },

    addedFriend:{type:[mongoose.Schema.Types.ObjectId],ref:'Users'},
    friendRequest:{type:[mongoose.Schema.Types.ObjectId],ref:'Users'},

    post:{
        type: [],
    }


});