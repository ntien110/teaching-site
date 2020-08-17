const { mongoose, getGfr } = require('../helper/mongoDb')

const deleteFileById = async (_id, cb) => {
    let gfs = await getGfr()
    await gfs.files.removeOne({ _id: _id }, (err, data) => {
        if (err) {
            cb(err)
        }
        else {
         cb(null)
        }
    })
}

module.exports = {
    deleteFileById
}