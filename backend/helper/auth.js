const jwt = require("jsonwebtoken");
const roleList = require("../constain").role;
const User = require("../models/user")

const verifyMidleware = (role)=>async (req, res, next)=>{
    const token = req.header('Authorization')? req.header('Authorization').split(" ")[1]: undefined

    if (!token) {
        return res.status(401).send("Access denied.");
    }

    try{
        const verifiedPayload = await jwt.verify(token, process.env.TOKEN_SECRET)
        if (roleList[verifiedPayload.role]>roleList[role]){
            throw "Access denied"
        }
        req.userId = verifiedPayload._id
        next()
    }catch(err){
        res.status(401).send("Access denied."+ err)
    }
}

const getAccessToken = (payload, exp)=>{
    return "Bearer "+jwt.sign({...payload, type: "access token"}, process.env.TOKEN_SECRET, {expiresIn: exp})
}

const getResetToken = (user, exp) =>{
    return "Bearer " + jwt.sign(
        {
            type: "reset token",
            _id: user._id,
            email: user.email,
            name: user.name,
            studentId: user.studentId,
        },
        process.env.TOKEN_SECRET+user.password,
        {expiresIn: exp})
}

const verifyResetToken = async (token)=>{
    token = token.split(" ")[1]
    try{
        const payload = jwt.decode(token)
        if(!payload._id){
            return {
                error: true,
                message: "Invalid payload."
            }
        }
        
        const foundUser = await User.findById(payload._id)
        const verifiedPayload = jwt.verify(token, process.env.TOKEN_SECRET+foundUser.password)
        return {
            valid: true,
            user: foundUser
        }
    } catch(err){
        return{
            error: true,
            message: err
        }
    }
}
module.exports = {
    verifyMidleware,
    getAccessToken,
    getResetToken,
    verifyResetToken
}