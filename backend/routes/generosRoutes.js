import { Router } from "express";
const router = Router();
import { createGenero, getGeneros, updateGenero, deleteGenero } from "../controllers/generoController.js";

// Rutas para Géneros
router.post("/", createGenero);
router.get("/", getGeneros);
router.put("/:id", updateGenero);
router.delete("/:id", deleteGenero);

export default router;
