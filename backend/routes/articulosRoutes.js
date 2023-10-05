import { Router } from "express";
const router = Router();
import { createArticulo, getArticulos, updateArticulo, deleteArticulo } from "../controllers/articuloController.js";

// Rutas para Artículos
router.post("/", createArticulo);
router.get("/", getArticulos);
router.put("/:id", updateArticulo);
router.delete("/:id", deleteArticulo);

export default router;
