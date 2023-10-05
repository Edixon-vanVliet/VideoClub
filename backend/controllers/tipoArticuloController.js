import TipoArticulo from "../models/tipoArticulo.js";

// CREATE - Crear un tipo de artículo
export async function createTipoArticulo(req, res) {
  try {
    const tipoArticulo = new TipoArticulo(req.body);
    await tipoArticulo.save();
    res.status(201).json(tipoArticulo);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el tipo de artículo" });
  }
}

// READ - Obtener todos los tipos de artículos
export async function getTiposArticulos(req, res) {
  try {
    const tiposArticulos = await TipoArticulo.find();
    res.json(tiposArticulos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los tipos de artículos" });
  }
}

// UPDATE - Actualizar un tipo de artículo por su ID
export async function updateTipoArticulo(req, res) {
  try {
    const { id } = req.params;
    const tipoArticulo = await TipoArticulo.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(tipoArticulo);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el tipo de artículo" });
  }
}

// DELETE - Eliminar un tipo de artículo por su ID
export async function deleteTipoArticulo(req, res) {
  try {
    const { id } = req.params;
    await TipoArticulo.findByIdAndRemove(id);
    res.json({ message: "Tipo de artículo eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el tipo de artículo" });
  }
}
