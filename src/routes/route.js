const express = require("express");
const router = express.Router();

const userController = require("../controllers/usercontroller");
const {
  createBook,
  getBooks,
  getReviewDetails,
  updatebook,
  deleteBook,
} = require("../controllers/bookcontroller");
const reviewController = require("../controllers/reviewcontrollers");
const middleware = require("../middleware/middlware");
const {upload} = require("../Helper/finalmulter")

//User & Login API
router.post("/register", userController.createUser);
router.post("/login", userController.userLogin);

//Book API
router.post("/books",middleware.mid1,upload.single("bookcover"), createBook);
router.get("/books", middleware.mid1, getBooks);
router.get("/books/:bookId", middleware.mid1, getReviewDetails);
router.put("/books/:bookId",middleware.mid1, upload.single("bookcover"), updatebook);
router.delete("/books/:bookId", middleware.mid1, deleteBook);

//Review API
router.post("/books/:bookId/review", reviewController.addReview);
router.put("/books/:bookId/review/:reviewId", reviewController.updateReview);
router.delete("/books/:bookId/review/:reviewId", reviewController.deleteReview);

module.exports = router;
