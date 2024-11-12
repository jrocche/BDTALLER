// src/routes/herramientas.routes.js
const express = require("express");
const router = express.Router();
const {
  getAllHerramientas,
  getHerramienta,
  crearHerramienta,
  actualizarHerramienta,
  eliminarHerramienta,
  getHistorialHerramienta,
} = require("../controllers/herramientas.controllers");
const authenticateToken = require("../middleware/Auth.middleware");

router.get("/herramientas", authenticateToken, getAllHerramientas);
router.get("/herramientas/:id", authenticateToken, getHerramienta);
router.post("/herramientas", authenticateToken, crearHerramienta);
router.put("/herramientas/:id", authenticateToken, actualizarHerramienta);
router.delete("/herramientas/:id", authenticateToken, eliminarHerramienta);
router.get("/herramientas/:id/historial", authenticateToken, getHistorialHerramienta);

module.exports = router;