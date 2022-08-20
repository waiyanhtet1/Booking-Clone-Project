import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Fill UserName!"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Fill Email!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Fill Password!"],
    },
    img: {
      type: String,
    },
    country: {
      type: String,
      required: [true, "Fill Country!"],
    },
    city: {
      type: String,
      required: [true, "Fill City!"],
    },
    phone: {
      type: String,
      required: [true, "Fill Phone!"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
