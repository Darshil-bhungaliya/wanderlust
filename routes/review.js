const express = require("express");
const router = express.Router({mergeParams:true}); // get router object 
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapasync.js");
const Review = require("../models/review.js");
const{validateReview,isLoggedIn,isReviewAuthor} = require("../middlewares.js")
const reviewController = require("../controllers/reviews.js")

//review
//post route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));

//delete route

router.delete("/:reviewId",isLoggedIn,isReviewAuthor, reviewController.destroyReview)

module.exports = router;
