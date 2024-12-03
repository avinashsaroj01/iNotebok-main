const { body, validationResult } = require('express-validator');

const express = require('express');
const router = express.Router();
const User = require('../models/User');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser= require('../middleware/fetchuser');


const JWT_SECRET= "iamavinash";

 // Route 1 :  Create a user using: POST."/api/auth/createuser" Not login required
router.post('/createuser',[
    body('name','Enter a valid name').isLength({min: 3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Enter a valid password').isLength({min: 5}),
//Added Validation 
], async (req,res)=>{
    let success= false;
    //if there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
try{
    let user=  await User.findOne({email:req.body.email})
    if(user){

        return res.status(400).json({ error:" Sorry! User with this email already exist"})
    }
    const salt= await bcrypt.genSalt(10); //salt->adds more security to the password 
    const secPassword= await bcrypt.hash(req.body.password,salt)
    user= await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
      }) 
      const data={
         user:{
            id:user.id
         }
      }
      //jwt Authentication 
      const authToken= jwt.sign(data,JWT_SECRET);
    //   console.log(jwtData);
    success=true;
    res.json({success,authToken});
   
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }})
           
    //  Route 2 : Authenticate  a user using:POST."/api/auth/login"
    router.post('/login',[
        body('email','Enter a valid email').isEmail(),
        body('password','Password can not be blank').exists(),
    //Added Validation 
    ], async (req,res)=>{
        let success=false;
        //if there are errors return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        

       const {email,password}= req.body;
           
       try{
       const user= await User.findOne({email});
       if(!user){
        success=false;
        // 400 is for bad request
        return  res.status(400).json({success,error:"Pls login with the correct credentials"});
       }

       const comparePassword=  await bcrypt.compare(password,user.password);
       if(!comparePassword){
        return  res.status(400).json({error:"Pls login with the correct credentials"});

       }

       //if password matches send the payload(user information );
       const data={
        user:{
           id:user.id
        }
     }
      //jwt Authentication 
      const authToken= jwt.sign(data,JWT_SECRET);
    //   console.log(jwtData);
    success=true;
    res.json({success,authToken});

    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

    // Route 3: Get user details using POST."/api/auth/getuser" login required
    router.post('/getuser' ,fetchuser, async (req,res)=>{

         try {
            userId= req.user.id;
            const user= await User.findById(userId).select("-password");
            res.send(user);
         } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error");
         }
    })

    

}) 

module.exports= router;
