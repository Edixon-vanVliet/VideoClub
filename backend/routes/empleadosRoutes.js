import { Router } from "express";
const router = Router();
import { createEmpleado, getEmpleados, updateEmpleado, deleteEmpleado } from "../controllers/empleadoController.js";

// Rutas para Empleados
router.post("/", createEmpleado);
router.get("/", getEmpleados);
router.put("/:id", updateEmpleado);
router.delete("/:id", deleteEmpleado);

export default router;
