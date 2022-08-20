import express from "express";
import {
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from "../controller/userController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// UPDATE
router.put("/:id", verifyAdmin, updateUser);

// DELETE
router.delete("/:id", verifyAdmin, deleteUser);

// GET
router.get("/:id", verifyAdmin, getUser);

// GET ALL
router.get("/", verifyAdmin, getAllUser);

export default router;
