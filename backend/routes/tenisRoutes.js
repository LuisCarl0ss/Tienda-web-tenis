import express from 'express';
import {
  getTenis,
  createTenis,
  updateTenis,
  deleteTenis,
} from '../controllers/tenisController.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Ruta para obtener todos los tenis (Pública)
router.get('/', getTenis);

// Rutas protegidas solo para administradores
router.post('/', verifyToken, isAdmin, createTenis);
router.put('/:id', verifyToken, isAdmin, updateTenis);
router.delete('/:id', verifyToken, isAdmin, deleteTenis);

export default router;
