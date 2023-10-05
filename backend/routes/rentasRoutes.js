import { Router } from "express";
const router = Router();
import { createRenta, getRentas, updateRenta, deleteRenta } from "../controllers/rentaController.js";

// Rutas para Rentas
router.post("/", createRenta);
router.get("/", getRentas);
router.put("/:id", updateRenta);
router.delete("/:id", deleteRenta);

export default router;
