import express from "express";

import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "../controllers/authController.js";

import {
  registerValidation,
  loginValidation,
} from "../validators/authValidator.js";

import protect from "../middleware/authMiddleware.js";

import validateRequest from "../middleware/validateRequest.js";

const router = express.Router();

router.post("/register", registerValidation, validateRequest, registerUser);

router.post("/login", loginValidation, validateRequest, loginUser);

router.get("/me", protect, getCurrentUser);
export default router;
