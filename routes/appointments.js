const router = require('express').Router();
const {Schedule} = require("../models/schedule");
const { User } = require('../models/user');
const auth = require('../middleware/auth');
const { startSession } = require('mongoose');






router.get('/appointment', [auth], (req,res, next) => {
    req.collection.find({})
    .toArray()
    .then(results => res.json(results))
    .catch(error => res.send(error));
});


router.post("/", [auth], (req,res, next) => {
    const{appointmentDate, time, email} = req.body;
    if(!appointmentDate || !time || !email){
        return res.status(400).json({
            message: 'Appointment date, name and email are required',
        });
    }
    const payload ={appointmentDate, time, email};
    req.collection.insertOne(payload)
    .then(result => res.json(result))
    .catch(error=> res.status(400).json(
       { message: 'No appointments avaliable on that date'},
    ));
});


router.delete('/appointment/:id',(req,res, next) => {
    const {id} = req.params;
    const _id = ObjectID(id);
    req.collection.deleteOne({_id })
    .then(result => res.json(result))
    .catch(error => res.send(error));
});

module.exports = router;
