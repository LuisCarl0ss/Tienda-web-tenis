import Tenis from '../models/Tenis.js';

// @desc    Obtener todos los tenis
// @route   GET /api/tenis
// @access  Público
export const getTenis = async (req, res) => {
  try {
    const tenis = await Tenis.find({});
    res.json(tenis);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los tenis' });
  }
};

// @desc    Crear un nuevo par de tenis
// @route   POST /api/tenis
// @access  Privado/Admin
export const createTenis = async (req, res) => {
  try {
    const { name, price, size, img } = req.body;
    const nuevoTenis = new Tenis({
      name,
      price,
      size,
      img,
    });
    const tenisGuardado = await nuevoTenis.save();
    res.status(201).json(tenisGuardado);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el tenis', error: error.message });
  }
};

// @desc    Actualizar un par de tenis
// @route   PUT /api/tenis/:id
// @access  Privado/Admin
export const updateTenis = async (req, res) => {
  try {
    const { name, price, size, img } = req.body;
    const tenis = await Tenis.findById(req.params.id);

    if (tenis) {
      tenis.name = name || tenis.name;
      tenis.price = price || tenis.price;
      tenis.size = size || tenis.size;
      tenis.img = img || tenis.img;

      const tenisActualizado = await tenis.save();
      res.json(tenisActualizado);
    } else {
      res.status(404).json({ message: 'Tenis no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el tenis', error: error.message });
  }
};

// @desc    Eliminar un par de tenis
// @route   DELETE /api/tenis/:id
// @access  Privado/Admin
export const deleteTenis = async (req, res) => {
  try {
    const tenis = await Tenis.findById(req.params.id);

    if (tenis) {
      await tenis.deleteOne(); // Usar deleteOne() en lugar de remove()
      res.json({ message: 'Tenis eliminado correctamente' });
    } else {
      res.status(404).json({ message: 'Tenis no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el tenis' });
  }
};
