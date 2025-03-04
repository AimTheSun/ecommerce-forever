import multer from "multer";   

// CREATE STORAGE CONFIGURATION
const storage = multer.diskStorage({
    filename: function (req, file, callback){
        callback(null, file.originalname);
    }

})

const upload = multer({storage});

export default upload;