import express from "express";

import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

import protect from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";
import { createTaskValidation } from "../validators/taskValidator.js";

const router = express.Router();

router
  .route("/")
  .post(protect, createTaskValidation, validateRequest, createTask)
  .get(protect, getTasks);

router
  .route("/:id")
  .get(protect, getTaskById)
  .put(protect, createTaskValidation, validateRequest, updateTask)
  .delete(protect, deleteTask);

export default router;
