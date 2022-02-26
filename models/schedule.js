const Joi = require('joi');
const mongoose = require('mongoose');


const SchSchema = new mongoose.Schema({
            Time:{
                type:String,
                max:500,
            },
            Date:{
                type:String,
            },
            dbcollection: {
                type:Array,
                default: [],
            },     
            creationDate: {type: String, default: new Date(Date.now()).toDateString()}
     },
            { timestamps: true }  
    );
   

module.exports.SchSchema = SchSchema;
module.exports.Log = mongoose.model("appointments", SchSchema);