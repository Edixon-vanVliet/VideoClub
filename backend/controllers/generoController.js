import Genero from "../models/genero.js";

// CREATE - Crear un género
export async function createGenero(req, res) {
  try {
    const genero = new Genero(req.body);
    await genero.save();
    res.status(201).json(genero);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el género" });
  }
}

// READ - Obtener todos los géneros
export async function getGeneros(req, res) {
  try {
    const generos = await Genero.find();
    res.json(generos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los géneros" });
  }
}

// UPDATE - Actualizar un género por su ID
export async function updateGenero(req, res) {
  try {
    const { id } = req.params;
    const genero = await Genero.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(genero);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al actualizar el género" });
  }
}

// DELETE - Eliminar un género por su ID
export async function deleteGenero(req, res) {
  try {
    const { id } = req.params;
    await Genero.findByIdAndRemove(id);
    res.json({ message: "Género eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el género" });
  }
}
