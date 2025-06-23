import express from "express";
import PublicacionesModel from "../models/publicacionesModel.js";

const router = express.Router();

router.get("/publicaciones", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const { publicaciones, total } = await PublicacionesModel.getPublicaciones(
      page,
      limit,
      search
    );

    res.json({ publicaciones, total });
  } catch (error) {
    console.error("Error al obtener las publicaciones:", error);
    res.status(500).json({ error: "Error al obtener las publicaciones" });
  }
});

router.put("/publicaciones/:id/disponible", async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization?.split(" ")[1];

    const resultado = await PublicacionesModel.republicarPublicacion(id);

    if (resultado) {
      res.json({ mensaje: "Publicación republicada correctamente." });
    } else {
      res.status(404).json({ error: "Publicación no encontrada." });
    }
  } catch (error) {
    console.error("Error al republicar la publicación:", error);
    res.status(500).json({ error: "Error al republicar la publicación." });
  }
});

router.put("/publicaciones/:id/vendido", async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization?.split(" ")[1];

    const resultado = await PublicacionesModel.marcarPublicacionComoVendida(id);

    if (resultado) {
      res.json({ mensaje: "Publicación marcada como vendida correctamente." });
    } else {
      res.status(404).json({ error: "Publicación no encontrada." });
    }
  } catch (error) {
    console.error("Error al marcar la publicación como vendida:", error);
    res.status(500).json({ error: "Error al marcar la publicación como vendida." });
  }
});

export default router;
