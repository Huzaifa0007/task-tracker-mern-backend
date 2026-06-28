import express from "express";
import { createTask } from "../controllers/taskController.js";
import protect from "../middleware/authMiddleware.js";
import { createTaskValidation } from "../validators/taskValidator.js";
import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

router.post("/", protect, createTaskValidation, validateRequest, createTask);

export default router;
