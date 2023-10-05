import Articulo from "../models/articulo.js";

// CREATE - Crear un artículo
export async function createArticulo(req, res) {
  try {
    const articulo = new Articulo(req.body);
    await articulo.save();
    res.status(201).json(articulo);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el artículo" });
  }
}

// READ - Obtener todos los artículos
export async function getArticulos(req, res) {
  try {
    const articulos = await Articulo.find();
    res.json(articulos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los artículos" });
  }
}

// UPDATE - Actualizar un artículo por su ID
export async function updateArticulo(req, res) {
  try {
    const { id } = req.params;
    const articulo = await Articulo.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(articulo);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el artículo" });
  }
}

// DELETE - Eliminar un artículo por su ID
export async function deleteArticulo(req, res) {
  try {
    const { id } = req.params;
    await Articulo.findByIdAndRemove(id);
    res.json({ message: "Artículo eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el artículo" });
  }
}
