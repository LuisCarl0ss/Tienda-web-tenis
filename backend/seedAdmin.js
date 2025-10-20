import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado a MongoDB para sembrar admin...');

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@tienda.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    // Verificar si el admin ya existe
    const adminExists = await User.findOne({ email: adminEmail });
    if (adminExists) {
      console.log('El usuario administrador ya existe.');
      return;
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Crear el nuevo usuario admin
    const newAdmin = new User({
      username: 'Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin', // Asignar el rol de admin
    });

    await newAdmin.save();
    console.log('¡Usuario administrador creado exitosamente!');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);

  } catch (error) {
    console.error('Error al sembrar el usuario administrador:', error);
  } finally {
    mongoose.disconnect();
    console.log('Desconectado de MongoDB.');
  }
};

seedAdmin();