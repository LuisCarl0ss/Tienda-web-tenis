import express from "express";
import { login } from "../controllers/authController.js";
import { register } from "../controllers/authController.js";

const router = express.Router();

// Registro
router.post("/register", register);

// Login
router.post("/login", login); 

export default router;
