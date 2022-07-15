const multer = require("multer");

// Handllina a multer error

exports.multererror = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json("File is too large");
    }
    if (error.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json("File limit reached");
    }
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json("File must be an Image");
    }
  }
};
