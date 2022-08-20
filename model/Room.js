import mongoose from "mongoose";

const RoomSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Fill Title!"],
  },

  price: {
    type: Number,
    required: [true, "Fill Price!"],
  },

  maxPeople: {
    type: Number,
    required: [true, "Fill MaxPeople!"],
  },
  desc: {
    type: String,
    required: [true, "Fill Description!"],
  },
  roomNumbers: [{ number: Number, unavailabelDates: { type: [Date] } }],
});

export default mongoose.model("Room", RoomSchema);
