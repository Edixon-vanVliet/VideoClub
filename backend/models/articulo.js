import { Schema, model } from "mongoose";

const articuloSchema = new Schema({
  titulo: String,
  tipoArticulo: {
    type: Schema.Types.ObjectId,
    ref: "TipoArticulo",
  },
  idioma: {
    type: Schema.Types.ObjectId,
    ref: "Idioma",
  },
  precioPorDia: Number,
  diasRenta: Number,
  montoEntregaTardia: Number,
});

export default model("Articulo", articuloSchema);
