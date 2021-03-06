const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const auctionSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    lider: {
      type: Schema.Types.ObjectId,
      ref: "Bid",
    },
    initial_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    currency: {
      type: String,
      enum: ["MXN", "USD"],
      default: "MXN",
    },
    initial_price: {
      type: Number,
      min: 100000,
      required: true,
    },
    location: {
      type: {
        type: String,
        default: "Point",
      },
      address: {
        type: String,
        required: true,
      },
      coords: {
        type: [Number],
        required: true,
      },
    },
    images: {
      type: [String],
      minlength: 1,
    },
  },
  { timestamps: true }
);

module.exports = model("Auction", auctionSchema);