import { Router } from "express";
import {
  register,
  login,
  getUsuario,
  getPublicacionesUsuario,
  crearPublicacionController,
  getPublicacionesRecientes,
  getPublicacionPorIdController,
  actualizarPublicacionController,
  eliminarPublicacionController,
  getNotificaciones,
  getVentasUsuario,
  getComprasUsuario,
  finalizarPublicacionController,
  republicarPublicacionController,
} from "../controllers/usuariosController.js";
import { crearNotificacion, marcarNotificacionComoLeida } from "../controllers/notificacionesController.js";
import validateCredentials from "../middlewares/validateCredentials.js";
import validateToken from "../middlewares/validateToken.js";
import { crearTransaccion } from "../controllers/usuariosController.js";

const router = Router();

router.post("/usuarios", validateCredentials, register);
router.post("/login", validateCredentials, login);
router.get("/usuarios", validateToken, getUsuario);
router.get("/publicaciones/usuario", validateToken, getPublicacionesUsuario);
router.post("/publicaciones", validateToken, crearPublicacionController);
router.get("/publicaciones/recientes", getPublicacionesRecientes);
router.get("/publicaciones/:id", getPublicacionPorIdController);
router.put(
  "/publicaciones/:id",
  validateToken,
  actualizarPublicacionController
);
router.delete(
  "/publicaciones/:id",
  validateToken,
  eliminarPublicacionController
);

router.get("/notificaciones", validateToken, getNotificaciones);
router.post("/notificaciones", validateToken, crearNotificacion);
router.post("/transacciones", validateToken, crearTransaccion);
router.put(
  "/notificaciones/:id/leido",
  validateToken,
  marcarNotificacionComoLeida
);

router.get("/ventas/usuario", validateToken, getVentasUsuario);
router.get("/compras/usuario", validateToken, getComprasUsuario);
router.put(
  "/publicaciones/:id/finalizar",
  validateToken,
  finalizarPublicacionController
);
router.put(
  "/publicaciones/:id/republicar",
  validateToken,
  republicarPublicacionController
);

export default router;
