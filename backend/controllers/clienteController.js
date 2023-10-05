import Cliente from "../models/cliente.js";

// CREATE - Crear un cliente
export async function createCliente(req, res) {
  try {
    const cliente = new Cliente(req.body);
    await cliente.save();
    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el cliente" });
  }
}

// READ - Obtener todos los clientes
export async function getClientes(req, res) {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los clientes" });
  }
}

// UPDATE - Actualizar un cliente por su ID
export async function updateCliente(req, res) {
  try {
    const { id } = req.params;
    const cliente = await Cliente.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el cliente" });
  }
}

// DELETE - Eliminar un cliente por su ID
export async function deleteCliente(req, res) {
  try {
    const { id } = req.params;
    await Cliente.findByIdAndRemove(id);
    res.json({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el cliente" });
  }
}
