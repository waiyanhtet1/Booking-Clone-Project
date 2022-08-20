import Hotel from "../model/Hotel.js";
import Room from "../model/Room.js";
import { createError } from "../utils/error.js";

// CREATE
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
      return res.status(201).json(savedRoom);
    } catch (error) {
      next(error);
    }
  } catch (error) {
    const msg = Object.values(error.errors).map((val) => val.properties);
    next(createError(400, msg));
  }
};

// UPDATE
export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};
export const updateRoomAvailablity = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      { $push: { "roomNumbers.$.unavailabelDates": req.body.date } }
    );
    return res.status(200).json("Room have been reserved!");
  } catch (error) {
    next(error);
  }
};

// DELETE
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {
      next(error);
    }
    return res.status(200).json("Room have been deleted!");
  } catch (error) {
    next(error);
  }
};

// GET
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    return res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

// GET ALL
export const getAllRoom = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    return res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};
