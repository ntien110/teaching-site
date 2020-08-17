const express = require('express');
const { getGfr, getUpload, getImageOnlyUpload, mongoose } = require("../helper/mongoDb")
const router = express.Router()
const { MongooseDocument } = require('mongoose');


// @route GET /
// @desc Loads form
router.get('/', (req, res) => {
    getGfr().files.find().toArray((err, files) => {
        // Check if files
        if (!files || files.length === 0) {
            res.render('index', { files: false });
        } else {
            files.map(file => {
                if (
                    file.contentType === 'image/jpeg' ||
                    file.contentType === 'image/png'
                ) {
                    file.isImage = true;
                } else {
                    file.isImage = false;
                }
            });
            res.render('index', { files: files });
        }
    });
});

// @route POST /upload
// @desc  Uploads file to DB
router.post('/upload', getUpload().single('file'), (req, res) => {
    res.json({ file: req.file });
    //res.redirect('/');
});

router.post('/imageUpload', (req, res) => {
    getImageOnlyUpload()( req, res, async ( err ) => {
        console.log(err)
        if ( err ) {
            return res.status(400).send({error: "File must be an image."});
        }
    res.json({ file: req.file });
    })
    //res.redirect('/');
});

// @route GET /files
// @desc  Display all files in JSON
router.get('/files', (req, res) => {
    getGfr().files.find().toArray((err, files) => {
        // Check if files
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No files exist'
            });
        }

        // Files exist
        return res.json(files);
    });
});

// @route GET /files/:filename
// @desc  Display single file object
router.get('/files/:id', (req, res) => {
    let id = req.params.id
    if (id.length === 12 || id.length === 24) {
        id = mongoose.mongo.ObjectId(req.params.id)
    } else {
        return res.status(400).json({
            err: 'Invalid Id'
        });

    }
    getGfr().files.findOne({ _id: id }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }
        // File exists
        return res.json(file);
    });
});

// @route GET /image/:filename
// @desc Display Image
router.get('/image/:id', (req, res) => {
    let id = req.params.id
    if (id.length === 12 || id.length === 24) {
        id = mongoose.mongo.ObjectId(req.params.id)
    } else {
        return res.status(400).json({
            err: 'Invalid Id'
        });

    }
    getGfr().files.findOne({ _id: id }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }

        // Check if image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            // Read output to browser
            const readstream = getGfr().createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({
                err: 'Not an image'
            });
        }
    });
});

// @route DELETE /files/:id
// @desc  Delete file
router.delete('/files/:id', (req, res) => {
    getGfr().remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
        if (err) {
            return res.status(404).json({ err: err });
        }

        res.redirect('/');
    });
});

module.exports = router