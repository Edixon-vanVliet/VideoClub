import { Schema, model } from "mongoose";

const empleadoSchema = new Schema({
  nombre: String,
  cedula: String,
  tandaLaboral: String,
  porcientoComision: Number,
  fechaIngreso: Date,
});

export default model("Empleado", empleadoSchema);
