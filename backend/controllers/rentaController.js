import Renta from "../models/renta.js";

// CREATE - Crear una renta
export async function createRenta(req, res) {
  try {
    const renta = new Renta(req.body);
    await renta.save();
    res.status(201).json(renta);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la renta" });
  }
}

// READ - Obtener todas las rentas
export async function getRentas(req, res) {
  try {
    const rentas = await Renta.find();
    res.json(rentas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las rentas" });
  }
}

// UPDATE - Actualizar una renta por su ID
export async function updateRenta(req, res) {
  try {
    const { id } = req.params;
    const renta = await Renta.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(renta);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la renta" });
  }
}

// DELETE - Eliminar una renta por su ID
export async function deleteRenta(req, res) {
  try {
    const { id } = req.params;
    await Renta.findByIdAndRemove(id);
    res.json({ message: "Renta eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la renta" });
  }
}
