const router = require("express").Router();
const exspress = require('express');
const {Schedule} = require("../models/schedule");
const { User } = require('../models/user');
const auth = require('../middleware/auth');




router.get('/appointment', [auth], (req,res, next) => {
    req.collection.find({})
    .toArray()
    .then(results => res.json(results))
    .catch(error => res.send(error));
});







router.post("/post", async (req, res) => {
    console.log("new appointment");
    try {
      const appoint = new Schedule({
        email: req.body.email,
        appointmentDate: req.body.appointmentDate,
        time: req.body.time,
      });
      await appoint.save();
  
      // Save it in the user's list
      const signedInUser = await User.findById(req.user._id);
  
      console.log("new appointment", appoint);
      // console.log(signedInUser);
      signedInUser.myList.push(appoint._id);
      await signedInUser.save();
  
      return res.send(appoint);
    } catch (ex) {
      console.log(ex);
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });
// router.post('/', [auth], (req,res, next) => {
//     const{appointmentDate, time, email} = req.body;
//     if(!appointmentDate || !time || !email){
//         return res.status(400).json({
//             message: 'Appointment date, name and email are required',
//         });
//     }
//     const payload ={appointmentDate, time, email};
//     req.collection.insertOne(payload)
//     .then(result => res.json(result))
//     .catch(error=> res.status(400).json(
//        { message: 'No appointments avaliable on that date'},
//     ));
// });


router.delete('/appointment/:id',(req,res, next) => {
    const {id} = req.params;
    const _id = ObjectID(id);
    req.collection.deleteOne({_id })
    .then(result => res.json(result))
    .catch(error => res.send(error));
});

module.exports = router;