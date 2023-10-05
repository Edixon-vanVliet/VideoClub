import { Router } from "express";
const router = Router();
import { createIdioma, getIdiomas, updateIdioma, deleteIdioma } from "../controllers/idiomaController.js";

// Rutas para Idiomas
router.post("/", createIdioma);
router.get("/", getIdiomas);
router.put("/:id", updateIdioma);
router.delete("/:id", deleteIdioma);

export default router;
