import { Schema, model } from "mongoose";

const elencoSchema = new Schema({
  nombre: String,
});

export default model("Elenco", elencoSchema);
