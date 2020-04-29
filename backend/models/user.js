const mongoose = require("mongoose");

const UserSchema  = mongoose.Schema({
    email: {
        type: String,
        require: true,
        max: 255
    },
    password: {
        type: String,
        require: true,
        min: 8,
        max: 1024
    },
    name: {
        type: String,
        require: true,
        max: 255,
        min: 6
    },
    studentId: String,
    role: {
        type: String,
        require: true,
        enum: ['admin', 'student'],
        default: "student"
    }
})

module.exports = mongoose.model("User", UserSchema)