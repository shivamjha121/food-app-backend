const express = require('express')
const router = express.Router()
const user = require('../models/Users')
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
// const { json } = require('react-router-dom');
const jwtsecret="abshbdniuwebqwjcnsioaklejdhsdk"


router.post("/createuser", 
 // username must be an email
 body('email','incorrect email').isEmail(),
 body('name').isLength({ min: 5 }),
 // password must be at least 5 chars long
 body('password','incorrect password').isLength({ min: 5 })
,async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
const salt=await bcrypt.genSalt(10);
let secpassword= await bcrypt.hash(req.body.password,salt)

    try {
        await user.create({
            name: req.body.name,
            email: req.body.email,
            password: secpassword,
            location:req.body.location
        })
        res.json({success: true})
    } catch (error) {
        res.json({success: false})
    }
})

//Login Page
router.post("/loginuser",
body('email','incorrect email').isEmail(),

 // password must be at least 5 chars long
 body('password','incorrect password').isLength({ min: 5 })
,async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
   let email=req.body.email;
    try {
      let userdata=  await user.findOne({email});
        if(!userdata){
            return res.status(400).json({ errors: "incorrect Cridentials" })
        }
        const pascomp=await bcrypt.compare(req.body.password,userdata.password)
        if(!pascomp){
            return res.status(400).json({ errors: "incorrect Cridentials" })
        }
        const data={
            user:{
                id:userdata.id
            }

        }
        const authtoken=jwt.sign(data,jwtsecret)
        const name=userdata.name

        return res.json({ success: true ,authtoken:authtoken,name:name})
    } catch (error) {
        res.json({success: false})
    }
})


module.exports = router;
