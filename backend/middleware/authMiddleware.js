import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // viene como "Bearer token"

  if (!token) {
    return res.status(403).json({ message: "Token requerido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // guardamos info del usuario en la request
    next();
  } catch (err) {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user && user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Acceso denegado, solo para administradores' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al verificar el rol del usuario' });
  }
};
