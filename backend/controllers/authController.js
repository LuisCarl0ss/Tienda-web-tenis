import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Registrar usuario
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // verificar si ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    // encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // guardar en DB
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "Usuario registrado correctamente ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el registro", error: err.message });
  }
};

// Login usuario
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // buscar usuario
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

    // comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

    // generar token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

     // 1. Separa la contraseña del resto de los datos del usuario
    const { password: _, ...userData } = user._doc;

    // 2. Envía el token y los datos del usuario (sin la contraseña)
    res.json({ token, user: userData }); // <-- SOLUCIÓN
  } catch (err) {
    res.status(500).json({ message: "Error en el login", error: err.message });
  }
};
