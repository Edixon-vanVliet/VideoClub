import { Router } from "express";
import {
  createTipoArticulo,
  getTiposArticulos,
  updateTipoArticulo,
  deleteTipoArticulo,
} from "../controllers/tipoArticuloController.js";

const router = Router();

// Rutas para Tipos de Artículos
router.post("/", createTipoArticulo);
router.get("/", getTiposArticulos);
router.put("/:id", updateTipoArticulo);
router.delete("/:id", deleteTipoArticulo);

export default router;
