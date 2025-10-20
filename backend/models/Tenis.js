import mongoose from "mongoose";

const tenisSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String, required: true },
  img: { type: String, required: true }, // URL de la imagen
});

export default mongoose.model("Tenis", tenisSchema);