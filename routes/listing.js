const express = require("express");
const router = express.Router(); // get router object 
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapasync.js");
const { isLoggedIn, isOnwer, validateListing } = require("../middlewares.js")

const listingController = require("../controllers/listing.js")


router.get("/about",listingController.about)
//Index Route
router.get("/", wrapAsync(listingController.index));

//new Route
router.get("/new", isLoggedIn, listingController.renderNew);

//show Route

router.get("/:id", wrapAsync(listingController.showlisting));

//create Route

router.post("/", isLoggedIn, validateListing, wrapAsync(listingController.createListing));

//Edit Route

router.get("/:id/edit", isLoggedIn, isOnwer, wrapAsync(listingController.renderEditForm));


//update route
router.put("/:id", isLoggedIn, isOnwer, validateListing, wrapAsync(listingController.updateListing));

//delete route 
router.delete("/:id", isLoggedIn, isOnwer, wrapAsync(listingController.destroyListing));

module.exports = router;
