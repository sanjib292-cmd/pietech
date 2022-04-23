const express = require('express');
const router = express.Router();
const { User } = require('./../model/users');
const asyncmiddleware = require('./../middlewares/asyncmiddleware')


router.get('/:user_name', asyncmiddleware(async (req, res) => {
    var regex = new RegExp(req.params.user_name, 'i');
    const user = await User.aggregate([
        { $match: { 'name': regex } }, //just precondition can be skipped
        { $unwind: '$name' },
        { $lookup: { from: "user", localField: "name", foreignField: 'name', as: "username" } },
        {$sort: {'age': -1}}
    ]);
    if (user) {
        return res.status(200).send(user);
    }
    return res.status(400).send('Not found');
}));




router.post('/', asyncmiddleware(async (req, res) => {
    let user = new User({
        name: req.body.name,
        age: req.body.age
        //password: req.body.password,
    });
    await user.save();
    return res.status(200).send('Saved to db');
}));

module.exports = router;
