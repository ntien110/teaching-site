const express = require("express");
const User = require("../models/user")
const {registerValidation, loginValidation} = require("../helper/validation")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {getAccessToken, getResetToken, verifyResetToken} = require("../helper/auth")
const constains = require("../constain")

const router = express.Router();

router.get("/", async (req, res) => {
    let users = await User.find({})
    res.send(users);
})

/**
 * API for register
 * 
 * Did: validation, check for repeate email
 */
router.post("/register", async (req, res) => {
    let userData = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    }
    let validation = registerValidation(userData)
    if (validation.error) {
        return res.send({
            error: "validation error",
            detail: validation.error
        })
    }
    try {
        let foundUser = await User.findOne({ email: userData.email }).maxTime(1000)
        if (foundUser) {
            return res.send({
                error: "email existed"
            })
        }
    } catch (err) {
        return res.status(400).send({error: err})
    }
    
    let newUser = new User(validation.value)
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(newUser.password, salt)
    newUser.password = hashPassword;
    try {
        let savedUser = await newUser.save()

        const accessToken = getAccessToken({
            _id: savedUser._id,
            role: savedUser.role
        }, constains.ACCESS_TOKEN_EXPIRATION)
        const resetToken = getResetToken({
            _id: savedUser._id,
            password: savedUser.password
        }, constains.RESET_TOKEN_EXPIRATION)
        return res
            .cookie("resetToken",
                resetToken,
                {
                    maxAge: 1000*60*60*24,
                    httpOnly: true,
                    // secure: true,
                    path: "/user/reset-token"
                })
            .send({
                _id: savedUser._id,
                email: savedUser.email,
                name: savedUser.name,
                accessToken: accessToken
            })
    } catch (err){
        return res.status(400).send({error: err})
    }
})

router.post("/login", async (req,res)=>{
    let userData = {
        email: req.body.email,
        password: req.body.password
    }
    let validation = loginValidation(userData)
    if (validation.error) {
        return res.send({
            error: "validation error",
            detail: validation.error
        })
    }
    try {
        let foundUser = await User.findOne({ email: userData.email }).maxTime(1000)
        if (!foundUser) {
            return res.send({
                error: "email or password is wrong."
            })
        }
        let matchPassword = await bcrypt.compare(userData.password, foundUser.password)
        if (matchPassword){
            const accessToken = getAccessToken({
                _id: foundUser._id,
                role: foundUser.role
            }, constains.ACCESS_TOKEN_EXPIRATION)
            const resetToken = getResetToken({
                _id: foundUser._id,
                password: foundUser.password
            }, constains.RESET_TOKEN_EXPIRATION)
            return res
            .cookie("resetToken",
                resetToken,
                {
                    maxAge: 1000*60*60*24,
                    httpOnly: true,
                    // secure: true,
                    path: "/user/reset-token"
                })
            .send({
                _id: foundUser._id,
                email: foundUser.email,
                name: foundUser.name,
                accessToken: accessToken
            })
        }
        return res.send({
            error: "email or password is wrong."
        })
    } catch (err) {
        return res.status(400).send({error: err})
    }
})

router.get("/reset-token", (req, res)=>{
    const resetToken = req.cookies.resetToken
    if (!resetToken){
        return res.status(401).send("Reset token required.")
    }
    const verified = verifyResetToken(resetToken)
    if (verified.error){
        return res.status(401).send(verified.message)
    }
    if (verified.valid){
        user = verified.user
        return res.send({
            accessToken: getAccessToken(
                {
                    _id: user._id,
                    role: user.role
                }, 
                constains.ACCESS_TOKEN_EXPIRATION
                )
        })
    }
    return res.status(401).send("Unknown error")
})
 
module.exports = router