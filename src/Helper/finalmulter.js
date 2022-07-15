const aws = require("aws-sdk");

const multer = require("multer");

const uuid = require("uuid").v4;

const multerS3 = require("multer-s3");

require("dotenv").config({
  path:'.env'
})


// Performing a file filteration 

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"));
  }
};


// config a AWS S3 services

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// config a multer 

exports.upload = multer({
  storage: multerS3({
    s3,
    ACL: "public-read",
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `uploads/${uuid()}-${file.originalname}`);
    },
  }),
  fileFilter,
  limits: { fileSize: 100000, files: 1 },
});



// exports.setProfilePic = (req, res) => {
//   res.status(200).json({ data: req.file });
// };
