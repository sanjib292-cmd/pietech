const express = require('express');
const router = express.Router();
const { User } = require('./../model/users');
const asyncmiddleware = require('./../middlewares/asyncmiddleware');



//Searching Data by name and sorting by Age #pagenum=int , Showing 5 result per page..

router.get('/:user_name/:pagenum', asyncmiddleware(async (req, res) => {
    var regex = new RegExp(req.params.user_name, 'i');
    let limit=5;
    const user = await User.aggregate([
        { $match: { 'name': regex } }, //just precondition can be skipped
        { $unwind: '$name' },
        { $sort: { 'age': 1 } },
        { $skip: (req.params.pagenum-1)*limit },
        { $limit: limit }
    ]);
    if (user) {
        return res.status(200).send(user);
    }
    return res.status(400).send('Not found');
}));




//Posting user to mongodb without any validation

router.post('/', asyncmiddleware(async (req, res) => {
    let user = new User({
        name: req.body.name,
        age: req.body.age
    });
    await user.save();
    return res.status(200).send('Saved to db');
}));

module.exports = router;
