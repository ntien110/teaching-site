const express = require("express");
const Subject = require("../models/subject")

const { verifyMidleware } = require("../helper/auth");
const subject = require("../models/subject");

const router = express.Router();

router.get("/:subjectId", async (req, res) => {
    let subjectId = req.params.subjectId
    let foundSubject
    try {
        foundSubject = await Subject.findById(subjectId)
        if (!foundSubject) {
            throw "Not found subject"
        }
    } catch (e) {
        return res.status(400).send({})
    }
    return res.status(200).send(foundSubject.blogs)
})

// TODO: validate request input
router.post(
    "/create",
    verifyMidleware("admin"),
    async (req, res) => {
        let subjectId = req.body.subjectId
        let foundSubject
        try {
            foundSubject = await Subject.findById(subjectId)
            if (!foundSubject) {
                throw `Not found subject with id ${JSON.stringify(req.body)}`
            }
        } catch (e) {
            return res.status(400).send({e})
        }

        foundSubject.blogs.push({
            title: req.body.title,
            content: req.body.content,
            images: req.body.images?req.body.images:[],
            createAt: new Date().getTime(),
            modifiedAt: new Date().getTime()
        })
        try {
            foundSubject.save(function (err) {
                if (!err) {
                    return res.status(200).send(foundSubject)
                } else {
                    throw "Failed to save new blog"
                }
            });
        } catch (e) {
            console.log(e)
            return res.status(500).send({})
        }
    })

module.exports = router