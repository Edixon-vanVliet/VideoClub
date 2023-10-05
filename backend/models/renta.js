import { Schema, model } from "mongoose";

const rentaSchema = new Schema({
  empleado: {
    type: Schema.Types.ObjectId,
    ref: "Empleado",
  },
  articulo: {
    type: Schema.Types.ObjectId,
    ref: "Articulo",
  },
  cliente: {
    type: Schema.Types.ObjectId,
    ref: "Cliente",
  },
  fechaRenta: Date,
  montoPorDia: Number,
  cantidadDias: Number,
  comentario: String,
});

export default model("Renta", rentaSchema);
