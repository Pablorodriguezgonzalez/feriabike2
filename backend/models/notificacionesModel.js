import pool from "../db/connection.js";

const getNotificacionesByUsuarioId = async (usuarioId) => {
  try {
    const query = "SELECT * FROM notificaciones WHERE usuario_id = $1 and leido = false";
    const result = await pool.query(query, [usuarioId]);
    return result.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener las notificaciones del usuario");
  }
};

const crearNotificacion = async (usuarioId, mensaje) => {
  try {
    const query =
      "INSERT INTO notificaciones (usuario_id, mensaje) VALUES ($1, $2)";
    await pool.query(query, [usuarioId, mensaje]);
  } catch (error) {
    console.error(error);
    throw new Error("Error al crear la notificación");
  }
};

const marcarNotificacionComoLeida = async (id) => {
  try {
    const query = "UPDATE notificaciones SET leido = true WHERE id = $1";
    await pool.query(query, [id]);
  } catch (error) {
    console.error(error);
    throw new Error("Error al marcar la notificación como leída");
  }
};

export { getNotificacionesByUsuarioId, marcarNotificacionComoLeida };
