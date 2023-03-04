// const path = require('path');
import path from 'path'
import multer from 'multer'
// const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req:any, file:any, cb:any){
        cb(null, './uploads/')
    },
    filename: function(req:any, file:any, cb:any){
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

var upload = multer({
    storage: storage,
    fileFilter: function(req:any, file:any, callback:any){
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ){
            callback(null, true)
        }else{
            console.log("only jpg & png file supported")
            callback(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2 
    }
})

export default upload

// module.exports = upload