const multer = require("multer");
const uuid = require("uuid");

// setup storage
const storage = multer.diskStorage({
    destination: function(req, file, cb, next) {
        if (file.mimetype === "application/pdf") {
            cb(null, 'uploads/pdf');
        }
        else if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg"
        ) {
            cb(null, 'uploads/image');
        }
        else cb(null, 'uploads/others')
    },
    filename: function(req, file, cb, next) {
        const arr = file.originalname.split('.');
        // get the original file extension/format
        const mtype = arr[arr.length-1];
        // add the original file extension/format to multer file as type
        file.type = mtype;
        // Set the name of the file in the upload folder
        if (file.mimetype === "application/pdf") {
            cb(null, `${uuid.v4().replaceAll("-","")}.pdf`);
        }
        else if ( file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg") {            
            // change type to img if file is image bcus image have multiple mimetypes/format/extensions
            file.type = 'img'
            let filename = `${uuid.v4().replaceAll("-","")}.png`
            cb(null, filename);
        }
        else {
            let filename = `${uuid.v4().replaceAll("-","")}.${mtype}`
            cb(null, filename);
        }
    },
    fileFilter: function(req, file, cb) {}
});

exports.upload = multer({ storage: storage, limits: { fileSize: 1000000 }}).any();