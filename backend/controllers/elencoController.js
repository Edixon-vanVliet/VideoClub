import Articulo from "../models/elenco.js";
import Elenco from "../models/elenco.js";
import ElencoArticulo from "../models/elencoArticulo.js";

// CREATE - Crear un elenco
export async function createElenco(req, res) {
  try {
    const elenco = new Elenco(req.body);
    await elenco.save();
    res.status(201).json(elenco);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el elenco" });
  }
}

// READ - Obtener todos los elencos
export async function getElencos(req, res) {
  try {
    const elencos = await Elenco.find();
    res.json(elencos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los elencos" });
  }
}

// UPDATE - Actualizar un elenco por su ID
export async function updateElenco(req, res) {
  try {
    const { id } = req.params;
    const elenco = await Elenco.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(elenco);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el elenco" });
  }
}

// DELETE - Eliminar un elenco por su ID
export async function deleteElenco(req, res) {
  try {
    const { id } = req.params;
    await Elenco.findByIdAndRemove(id);
    res.json({ message: "Elenco eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el elenco" });
  }
}

// CREATE - Asociar un actor a un artículo por su ID de artículo
export async function associateActorToArticle(req, res) {
  try {
    const { id } = req.params; // ID del actor (Elenco)
    const { articuloId } = req.body; // ID del artículo (Articulo)
    const rol = req.body.rol; // Rol del actor en el artículo

    // Verificar si el artículo (Articulo) existe
    const articuloExist = await Articulo.findById(articuloId);
    if (!articuloExist) {
      return res.status(404).json({ error: "El artículo especificado no existe" });
    }

    // Crear la asociación entre el actor (Elenco) y el artículo (Articulo)
    const elencoArticulo = new ElencoArticulo({ articulo: articuloId, elenco: id, rol });
    await elencoArticulo.save();

    res.status(201).json(elencoArticulo);
  } catch (error) {
    res.status(500).json({ error: "Error al asociar el actor al artículo" });
  }
}
