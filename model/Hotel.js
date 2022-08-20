import mongoose from "mongoose";

const HotelSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Fill Name!"],
  },
  type: {
    type: String,
    required: [true, "Fill Type!"],
  },
  city: {
    type: String,
    required: [true, "Fill City!"],
  },
  address: {
    type: String,
    required: [true, "Fill Address!"],
  },
  distance: {
    type: String,
    required: [true, "Fill Distance!"],
  },
  photos: {
    type: [String],
  },
  title: {
    type: String,
    required: [true, "Fill Title!"],
  },
  desc: {
    type: String,
    required: [true, "Fill Description!"],
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  rooms: {
    type: [String],
  },
  cheapestPrice: {
    type: Number,
    required: [true, "Fill CheapestPrice!"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Hotel", HotelSchema);
