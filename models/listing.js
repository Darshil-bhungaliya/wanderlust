
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: { type: String },
    url: {
      type: String,
      // required: true,
      default:
        "https://a0.muscache.com/im/pictures/miso/Hosting-556971771162773048/original/81365794-42bf-4dfb-b0a8-515307063f53.jpeg?im_w=1200",
      set: (v) =>
        v === ""
          ? "https://a0.muscache.com/im/pictures/miso/Hosting-556971771162773048/original/81365794-42bf-4dfb-b0a8-515307063f53.jpeg?im_w=1200"
          : v,
    },
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review"
    },
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
  },
});
//mongoose middleware for delete all review when we delete the lsisting

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    try {
      await Review.deleteMany({ _id: { $in: listing.reviews } });
    } catch (err) {
      console.error(err);
    }
  }
});
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;


