const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
        max: 255,
        min: 1
    },
    content: {
        type: String
    },
    images: [String],
    createAt: Date,
    modifiedAt: Date
})

const subjectSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        max: 255,
        min: 1
    },
    imageId: {
        type: mongoose.Schema.Types.ObjectId
    },
    description: {
        type: String,
        max: 1024,
    },
    blogs: [blogSchema]
})

module.exports = mongoose.model("Subject", subjectSchema)