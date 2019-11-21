const express = require('express')
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const model = require('../model/User');

process.env.SCRET_KEY = 'secret';

// Register
router.post('/add',function (req,res) {
    var users = new model({
        first_name : req.body.fname,
        last_name : req.body.lname,
        username : req.body.username,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, salt),
    })

    users.save((err)=> {
        if (err) {
            res.send('email atau username sudah digunakan');
        }else{    
            res.send({users : users});
        }
    })
    })

// Login
router.post('/login',function (req,res) {
        model.findOne({email: req.body.email})
        .then((user) => {
            if(user){
                if (bcrypt.compareSync(req.body.password,user.password)){
                const payload ={
                    _id: user._id,
                        first_name: user.first_name,
                        email: user.email
                    }
                    let token = jwt.sign(payload,'secret_key',{
                        expiresIn : 1440
                    })
                    res.send(token)
                }else{
                    res.json('user tidak ada');
                }
            }else{
                res.json('user tidak ada')
            }
        })
        .catch(err=>{
            res.send(err);
        })
})

router.get('/user', (req, res) => {
    try{
        var verify = jwt.verify(token,'secret_key')
        if (verify) {
            model.find({_id : verify._id})
            .then((user)=>{
                res.send(user);
            })
        }
    }
    catch(err){
        res.send('login dahulu');
    }
});

router.get('/logout',(res,req)=>{
    jwt.destroy(token);
})

module.exports = router;