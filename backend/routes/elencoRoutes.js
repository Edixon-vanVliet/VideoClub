import { Router } from "express";
const router = Router();
import {
  createElenco,
  getElencos,
  updateElenco,
  deleteElenco,
  associateActorToArticle,
} from "../controllers/elencoController.js";

// Rutas para Elenco
router.post("/", createElenco);
router.get("/", getElencos);
router.put("/:id", updateElenco);
router.delete("/:id", deleteElenco);
router.post("/:id/associate", associateActorToArticle);

export default router;
