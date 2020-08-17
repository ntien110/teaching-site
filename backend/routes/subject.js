const express = require("express");
const Subject = require("../models/subject")
const { creatingSubjectValidation, objectIdValidation } = require("../helper/validation")
const { getImageOnlyUpload, mongoose, getGfr } = require("../helper/mongoDb")
const constains = require("../constain")
const { deleteFileById } = require("../models/file")
const { verifyMidleware } = require("../helper/auth");

const router = express.Router();

router.get("/", async (req, res) => {
    let subjects = await Subject.find({})
    res.send(subjects);
})

let imageOnlyUpload = getImageOnlyUpload()

/**
 * API to create a new subject
 * 
 * Did: validation, check for repeate name
 */
router.post(
    "/create",
    verifyMidleware("admin"),
    async (req, res) => {
        await imageOnlyUpload(req, res, async (err) => {
            if (err) {
                return res.status(400).send({ error: "File must be an image." });
            }

            let subjectData = {
                name: req.body.name,
                imageId: req.file ? String(req.file.id) : undefined,
                description: req.body.description ? req.body.description : undefined
            }

            let validation = creatingSubjectValidation(subjectData)
            if (validation.error) {
                if (req.file) {
                    let result = await deleteFileById(req.file.id, (error) => {
                        if (error) {
                            console.log(error)
                        }
                    })
                }
                return res.status(400).send({
                    error: "validation error",
                    detail: validation.error
                })
            }
            try {
                let foundSubject = await Subject.findOne({ name: subjectData.name }).maxTime(1000)
                if (foundSubject) {
                    if (req.file) {
                        let result = await deleteFileById(req.file.id, (error) => {
                            if (error) {
                                console.log(error)
                            }
                        })
                    }
                    return res.status(409).send({
                        error: "Subject name existed"
                    })
                }
            } catch (err) {
                return res.status(500).send({ error: err })
            }

            let newSubject = new Subject(subjectData)
            try {
                let savedSubject = await newSubject.save()
                return res
                    .send({
                        savedSubject
                    })
            } catch (err) {
                if (req.file) {
                    let result = await deleteFileById(req.file.id, (error) => {
                        if (error) {
                            console.log(error)
                        }
                    })
                }
                return res.status(500).send({ error: err })
            }

        });
    })

router.delete("/:id",
    verifyMidleware("admin"),
    async (req, res) => {
        console.log(objectIdValidation(req.params.id))
        if (!req.params.id || objectIdValidation(req.params.id).error) {
            return res.status(400).send({ error: "Valid subject Id required." })
        }
        let foundSubject = await Subject.findOne({ _id: req.params.id })
        if (foundSubject && foundSubject.imageId) {
            let result = await deleteFileById(foundSubject.imageId, (error) => {
                if (error) {
                    console.log(error)
                }
            })
        }
        Subject.deleteOne({ _id: req.params.id }, (err) => {
            if (err) {
                return res.status(500).send({})
            } else {
                return res.status(200).send({})
            }
        })
    })

router.post(
    "/edit",
    verifyMidleware("admin"),
    async (req, res) => {
        await imageOnlyUpload(req, res, async (err) => {
            if (err) {
                return res.status(400).send({ error: "File must be an image." });
            }
            console.log(req.body)
            
            try {
                let foundSubject = await Subject.findOne({ _id: req.body._id }).maxTime(1000)
                if (foundSubject) {
                    if (req.body.name) {
                        foundSubject.name = req.body.name
                    }
                    if (req.body.description) {
                        foundSubject.description = req.body.description
                    }
                    if (req.file) {
                        foundSubject.imageId = String(req.file.id)
                    }

                    // let validation = creatingSubjectValidation(foundSubject)
                    // if (validation.error) {
                    //     if (req.file) {
                    //         let result = await deleteFileById(req.file.id, (error) => {
                    //             if (error) {
                    //                 console.log(error)
                    //             }
                    //         })
                    //     }
                    //     return res.status(400).send({
                    //         error: "validation error",
                    //         detail: validation.error
                    //     })
                    // }
                    foundSubject.save()
                    return res.status(200).send({})
                } else {
                    return res.status(400).send({})
                }
            } catch (err) {
                return res.status(500).send({ error: err })
            }

        });
    })

module.exports = router