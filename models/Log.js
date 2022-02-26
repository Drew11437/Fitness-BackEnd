const Joi = require('joi');
const mongoose = require('mongoose');


const LogSchema = new mongoose.Schema({
            workoutLog:{
                type:String,
                max:500,
            },
            mealLog:{
                type:String,
            },
            completion: {
                type:Array,
                default: [],
            },     
            creationDate: {type: String, default: new Date(Date.now()).toDateString()}
     },
            { timestamps: true }  
    );
   

module.exports.LogSchema = LogSchema;
module.exports.Log = mongoose.model("Post", LogSchema);