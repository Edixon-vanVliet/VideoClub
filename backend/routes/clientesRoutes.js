import { Router } from "express";
const router = Router();
import { createCliente, getClientes, updateCliente, deleteCliente } from "../controllers/clienteController.js";

// Rutas para Clientes
router.post("/", createCliente);
router.get("/", getClientes);
router.put("/:id", updateCliente);
router.delete("/:id", deleteCliente);

export default router;
