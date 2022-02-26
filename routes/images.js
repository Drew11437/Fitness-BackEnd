const router = require('express').Router();
const {image} = require("../models/image");
const { User } = require('../models/user');
const auth = require('../middleware/auth');
const { startSession } = require('mongoose');



router.post("/", [auth], async (req,res)=>{
    try {
        const user = await User.findById(req.user._id);

        const newimage = new image(req.body);

        user.images.push(newimage);

        await user.save();

        return res.send(user);

    } catch (err) {
        res.status(500).json(err);
    }
});





router.put("/:imageId", [auth], async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        let image = user.images.id(req.params.imageId);

        image = {...image, ...req.body};

        await user.save()

        return res.send(image);
        
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/:userId", [auth], async (req, res) => {
    const user = await User.findById(req.params.userId);
    await user.remove();
    return res.send(user);
});


module.exports = router;



