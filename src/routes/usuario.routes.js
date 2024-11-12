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

router.get("/usuarios", getAllUsuarios);
//router.get("/usuarios", authenticateToken, getAllUsuarios);
router.get("/usuarios/:id", authenticateToken, getUsuario);
router.post("/usuarios", authenticateToken, crearUsuario);
router.put("/usuarios/:id", authenticateToken, actualizarUsuario);
router.delete("/usuarios/:id", authenticateToken, eliminarUsuario);

module.exports = router;