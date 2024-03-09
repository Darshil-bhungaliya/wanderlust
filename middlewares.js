const Review = require("./models/review.js");
const Listing = require("./models/listing.js");
const{lisitingSchema,reviewSchema} = require("./schema.js");
const ExpressError = require("./utils/expresserror.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) { // Check if the user is not authenticated
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create a listing!");
        return res.redirect("/login"); // Redirect to the login page if not authenticated
    }
    next(); // Call the next middleware in the chain if authenticated
};

module.exports.saveRedirecturl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next();
}

module.exports.isOnwer = async (req,res,next)=>{
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","you are not the owner of this listing");
        return res.redirect(`/listings/${id}`)
        }
        next();
}

module.exports.validateListing = (req,res,next)=>{
    let{error} = lisitingSchema.validate(req.body); 
    if(error){
        let errmsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errmsg)
    }else{
        next();
    }
}

module.exports.validateReview = (req,res,next)=>{
    let{error} = reviewSchema.validate(req.body); 
    if(error){
        let errmsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errmsg)
    }else{
        next();
    }
}

module.exports.isReviewAuthor = async (req,res,next)=>{
    let { id,reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","you are not the author of this listing");
        return res.redirect(`/listings/${id}`)
        }
        next();
}
