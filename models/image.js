const Joi = require('joi');
const mongoose = require('mongoose');


const ImageSchema = new mongoose.Schema({
    name:{
        type:String,
        max:500,
    },
    desc:{
        type:String,
    },
    img: {
    },     
    creationDate: {type: String, default: new Date(Date.now()).toDateString()}
},
    { timestamps: true }  
);

module.exports.ImageSchema = ImageSchema;
module.exports = new mongoose.model(`Image`, ImageSchema);

