import { Schema, model } from "mongoose";

const elencoArticuloSchema = new Schema({
  articulo: {
    type: Schema.Types.ObjectId,
    ref: "Articulo",
  },
  elenco: {
    type: Schema.Types.ObjectId,
    ref: "Elenco",
  },
  rol: String,
});

export default model("ElencoArticulo", elencoArticuloSchema);
