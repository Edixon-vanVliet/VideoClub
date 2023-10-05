import { Schema, model } from "mongoose";

const generoSchema = new Schema({
  descripcion: String,
});

export default model("Genero", generoSchema);
