import { Schema, model } from "mongoose";

const idiomaSchema = new Schema({
  descripcion: String,
});

export default model("Idioma", idiomaSchema);
