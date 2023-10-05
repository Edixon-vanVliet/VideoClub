import Idioma from "../models/idioma.js";

// CREATE - Crear un idioma
export async function createIdioma(req, res) {
  try {
    const idioma = new Idioma(req.body);
    await idioma.save();
    res.status(201).json(idioma);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el idioma" });
  }
}

// READ - Obtener todos los idiomas
export async function getIdiomas(req, res) {
  try {
    const idiomas = await Idioma.find();
    res.json(idiomas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los idiomas" });
  }
}

// UPDATE - Actualizar un idioma por su ID
export async function updateIdioma(req, res) {
  try {
    const { id } = req.params;
    const idioma = await Idioma.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(idioma);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el idioma" });
  }
}

// DELETE - Eliminar un idioma por su ID
export async function deleteIdioma(req, res) {
  try {
    const { id } = req.params;
    await Idioma.findByIdAndRemove(id);
    res.json({ message: "Idioma eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el idioma" });
  }
}
