import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import checkoutRoutes from './routes/checkout.js';
import tenisRoutes from './routes/tenisRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({ 
  origin: "https://tienda-web-tenis.vercel.app", // La URL del frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"], 
  credentials: true,
}));

// --- RUTAS ---

app.use('/api/auth', authRoutes);
app.use('/api', checkoutRoutes);
app.use('/api/tenis', tenisRoutes); 

// Conexión a la DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));
 
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`))