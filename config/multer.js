import multer from "multer";
import path from "path";

// setting up disk storage
const storage = multer.diskStorage({
    // destination: "./public/uploads"
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() +
        path.extname(file.originalname));
    }
})

// initializing the file upload 
const upload = multer({ storage: storage,

    // file limit size
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb)
    }
})

// check file type
function checkFileType (file, cb) {
    // allow extension format

    const filetypes = /jpeg|jpg|png|pdf/;
    // checking extension format 
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // checking mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        req.flash("error", "invalid file")
        return res.redirect("back");
        cb("ERROR: Please Kindly upload a valid filetype");
    }
}

module.exports = upload;