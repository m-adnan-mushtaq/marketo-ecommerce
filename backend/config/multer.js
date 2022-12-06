import multer from "multer"
const storage= multer.memoryStorage()
import {extname} from "path"


// instance of multer
const upload= multer({
    storage,
    fileFilter: function (req, file, cb) {
        const allowedTypes = /jpeg|jpg|png/
        return fileValidatorHelper(file, cb, allowedTypes)
    },
    limits: {
        files: 1,
        fileSize: 4 * 1024 * 1024 //4mb,
    }
}).single('image')

export {upload}


/**
 * function for handling unqiue names of files
 * @param {Object} file  file to upload
 * @param {Function} cb  cb for execeptions
 */
 function fileValidatorHelper(file, cb) {
    const regex= /jpeg|jpg|png/
    const checkFileType = regex.test(extname(file.originalname))
    const checkMimeType = regex.test(file.mimetype)
    if (checkFileType && checkMimeType) cb(null, file)
    else cb(new Error('File format is invalid, try using images!'))
}
