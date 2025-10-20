import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/checkout", verifyToken, (req, res) => {
  res.json({ message: `Checkout exitoso para el usuario con id ${req.user.id}` });
});

export default router;
