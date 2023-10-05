import Empleado from "../models/empleado.js";

// CREATE - Crear un empleado
export async function createEmpleado(req, res) {
  try {
    const empleado = new Empleado(req.body);
    await empleado.save();
    res.status(201).json(empleado);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el empleado" });
  }
}

// READ - Obtener todos los empleados
export async function getEmpleados(req, res) {
  try {
    const empleados = await Empleado.find();
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los empleados" });
  }
}

// UPDATE - Actualizar un empleado por su ID
export async function updateEmpleado(req, res) {
  try {
    const { id } = req.params;
    const empleado = await Empleado.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(empleado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el empleado" });
  }
}

// DELETE - Eliminar un empleado por su ID
export async function deleteEmpleado(req, res) {
  try {
    const { id } = req.params;
    await Empleado.findByIdAndRemove(id);
    res.json({ message: "Empleado eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el empleado" });
  }
}
