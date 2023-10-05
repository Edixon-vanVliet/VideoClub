import { Schema, model } from "mongoose";

const tipoArticuloSchema = new Schema({
  descripcion: String,
});

export default model("TipoArticulo", tipoArticuloSchema);
