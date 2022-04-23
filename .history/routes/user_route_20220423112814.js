const express = require('express');
const router = express.Router();
const {User}=require('./../model/users');
const asyncmiddleware=require('./../middlewares/asyncmiddleware')


router.get('/:user_name',asyncmiddleware(async(req,res)=>{
    var regex = new RegExp(req.params.user_name, 'i');
    const user = await User.aggregate([
        { $match: { 'name': regex } }, //just precondition can be skipped
        { $unwind: 'name' },
        { $match: { 'name': regex } },
        {$lookup:{from:"user",localField:"name",foreignField:'name',as: "username"}}
    ]);
    if (itm) {
        return res.status(200).send(itm);
    }
    return res.status(400).send('Not found');
    // const recommended= await User.find( { _id: { $nin: [mongoose.Types.ObjectId(decoded.id)] } } );
    // if(recommended.length!==0){
    //     return res.status(200).send(recommended);
    // }
    // return res.status(200).send('recommended list not found ');
}));

module.exports = router;
