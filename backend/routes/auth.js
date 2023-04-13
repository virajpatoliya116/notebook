const express = require('express')
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "Bhoomil@182"
// const { ResultWithContext } = require('express-validator/src/chain');

// Create user using post "/api/auth/createuser"
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must have 5 character').isLength({ min: 5 }),
] , async (req, res)=>{
    let success = false
    // obj = {
    //     name: "Raj",
    //     number: 458
    // }
    // res.json(obj)
    // console.log(req.body)
    // const user = User(req.body)
    // user.save();

    // If there are error, return bad request and the error ()
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    // 
    try {
        // Check wether the user with this email exist already
        let user = await User.findOne({email: req.body.email})
    
        if(user){
            return res.status(400).json({message: "Sorry a user with this email already exist"})
        }
    
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);


        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        const data = {
            user:{
                id:user.id
            }
        }   
        const jwtData = jwt.sign(data, JWT_SECRET)
        console.log(jwtData)
        success = true
        res.json({success, jwtData})
        // res.send(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success, error: "some error exists"})
    }
    
});

// Authentication user using post "/api/auth/login"
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
] , async (req, res)=>{
    let success = false
    // If there are error, return bad request and the error 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    const {email, password} = req.body;
    try { 
        // Check wether the user with this email exist already
        let user = await User.findOne({email})
    
        if(!user){
            return res.status(400).json({success, message: "Please try to login with correct credentials"});
        }
    
        const passwordCompare = await bcrypt.compare(password, user.password)
        // console.log(passwordCompare)
        if(!passwordCompare){
            return res.status(400).json(success, {message: "Please try to login with correct credentials"});
        }

        const data = {
            user:{
                id:user.id
            }
        }
        success = true
        const jwtData = jwt.sign(data, JWT_SECRET)
        res.json({success, jwtData})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success, error: "Internal server error"})
    }
    
});

// get loggedin user details using post "/api/auth/getuser". login required
router.post('/getuser', fetchuser, async (req, res)=>{
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({message: "Internal server Error"});
    }
})

module.exports = router