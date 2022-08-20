import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getAllRoom,
  updateRoomAvailablity,
} from "../controller/roomController.js";

const router = express.Router();

router.post("/:hotelId", verifyAdmin, createRoom);

router.put("/:id", verifyAdmin, updateRoom);

router.put("/availablility/:id", updateRoomAvailablity);

router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);

router.get("/:id", getRoom);

router.get("/", getAllRoom);

export default router;
