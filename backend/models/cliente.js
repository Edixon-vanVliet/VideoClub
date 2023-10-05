import { Schema, model } from "mongoose";

const clienteSchema = new Schema({
  nombre: String,
  cedula: String,
  numeroTarjetaCredito: String,
  limiteDeCredito: Number,
  tipoPersona: String, // 'fisica' o 'juridica'
});

export default model("Cliente", clienteSchema);
