const express = require("express");
const router = express.Router();
const {
  getAllUsuarios,
  getUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} = require("../controllers/usuario.controllers");
const authenticateToken = require("../middleware/Auth.middleware");

// Agregar manejador de errores específico para esta ruta
const handleErrors = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error en el servidor"
    });
  }
};

router.get("/usuarios", authenticateToken, getAllUsuarios);
router.get("/usuarios/:id", authenticateToken, getUsuario);
router.post("/usuarios", authenticateToken, crearUsuario);
router.put("/usuarios/:id", authenticateToken, async (req, res) => {
  try {
    await actualizarUsuario(req, res);
  } catch (error) {
    console.error('Error en ruta PUT /usuarios/:id:', error);
    res.status(500).json({
      success: false,
      message: "Error al procesar la solicitud",
      error: error.message
    });
  }
});
router.delete("/usuarios/:id", authenticateToken, eliminarUsuario);

module.exports = router;