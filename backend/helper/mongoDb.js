const mongoose = require("mongoose")
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');


const path = require('path');
const crypto = require('crypto');
const multer = require('multer');

// Init gfs
let gfs;
let storage;
let upload;
let imageOnlyUpload;

// Connect to database
const startConnectionToDb = async (callback) => {
    await mongoose.connect(
        process.env.DB_URI,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => {
            console.log("connected to database")

            // Init stream
            gfs = Grid(mongoose.connection.db, mongoose.mongo);
            gfs.collection('uploads');
        }
    )

    mongoose.connection.on("error", (err) => {
        console.log(err)
    })

    // mongoose.connection.once('open', () => {
    // });

    storage = await new GridFsStorage({
        db: mongoose.connection.db,
        file: (req, file) => {
            return new Promise((resolve, reject) => {
                crypto.randomBytes(16, (err, buf) => {
                    if (err) {
                        return reject(err);
                    }
                    const filename = buf.toString('hex') + path.extname(file.originalname);
                    const fileInfo = {
                        filename: filename,
                        bucketName: 'uploads'
                    };
                    resolve(fileInfo);
                });
            });
        }
    });

    upload = await multer({ storage });

    imageOnlyUpload = await multer({ 
        storage,
        errorHandling: 'manual',
        fileFilter: async (req, file, callback) => {
            var ext = path.extname(file.originalname);
            console.log(ext)
            if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
                return callback('Only images are allowed')
            }
            callback(null, true)
        },
        limits:{
            fileSize: 10 * 1024 * 1024
        }
    }).single("image");

    callback()
}

let getUpload = () => {
    return upload
}

let getImageOnlyUpload = () => {
    return imageOnlyUpload
}

let getGfr = () => {
    return gfs
}

module.exports = {
    mongoose,
    startConnectionToDb,
    getGfr,
    getUpload,
    getImageOnlyUpload
}

