const router = require('express').Router();
const {Log} = require("../models/Log");
const { User } = require('../models/user');
const auth = require('../middleware/auth');
const { startSession } = require('mongoose');



router.post("/", [auth], async (req,res)=>{
    try {
        const user = await User.findById(req.user._id);

        const newLog = new Log(req.body);

        user.Logs.push(newLog);

        await user.save();

        return res.send(user);

    } catch (err) {
        res.status(500).json(err);
    }
});





router.put("/:logId", [auth], async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        let log = user.logs.id(req.params.logId);

        log = {...log, ...req.body};

        await user.save()

        return res.send(log);
        
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

