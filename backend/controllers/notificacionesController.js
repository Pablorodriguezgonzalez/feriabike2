import pool from "../db/connection.js";

const marcarNotificacionComoLeida = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "UPDATE notificaciones SET leido = true WHERE id = $1";
    await pool.query(query, [id]);
    res.status(200).json({ message: "Notificación marcada como leída" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al marcar la notificación como leída" });
  }
};

const crearNotificacion = async (req, res) => {
  try {
    const { usuario_id, mensaje, link } = req.body;
    const query =
      "INSERT INTO notificaciones (usuario_id, mensaje, link) VALUES ($1, $2, $3)";
    await pool.query(query, [usuario_id, mensaje, link]);
    res.status(201).json({ message: "Notificación creada con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la notificación", error: error.message });
  }
};

export { crearNotificacion, marcarNotificacionComoLeida };
