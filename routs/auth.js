const router= require("express").Router();
const User = require("../models/user");
const Cryptojs= require("crypto-js")
const jwt = require("jsonwebtoken")

//register
router.post("/register", async (req, res)=>{
    const newUser= new User({
        userName: req.body.userName,
        email: req.body.email,
        passward: Cryptojs.AES.encrypt(req.body.passward, process.env.SECRET_LETTER).toString()            // pasward .evn & crypto.js
    })
    try{
        const result =await newUser.save();
        res.status(201).json(result)        // ? .json()
    } catch(e){
        console.log(e);
       res.status(500).json(e);
    }

    
})

//login
router.post("/login", async(req, res)=>{
    try{
        const user= await User.findOne({ userName: req.body.userName})
        !user && res.status(401).json("wrong credentials!")  // ? if condition?
        const hashedPasward= Cryptojs.AES.decrypt(user.passward, process.env.SECRET_LETTER)  //decording 
        const Orignalpassward= hashedPasward.toString(Cryptojs.enc.Utf8)  //?Cryptojs.enc.Utf8
    
        Orignalpassward !== req.body.passward && res.status(401).json("wrong credentials!")//if condition ???
        
        const accessToken= jwt.sign({
           id: user._id,
           isAdmin: user.isAdmin
        },process.env.jet_SECRET_key,{expiresIn: "3d"})
        const {passward, ...others}= user._doc;
        res.status(200).json({...others, accessToken})
    }catch(e){
        console.log(e)
        res.status(500).json(e)
    }


})

module.exports= router;