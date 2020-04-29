const express = require("express");
const router = express.Router();
const {verifyMidleware} = require("../helper/auth")

router.get("/",verifyMidleware("student"), (req, res)=>{
    res.send("okkk.");
})

module.exports = router;