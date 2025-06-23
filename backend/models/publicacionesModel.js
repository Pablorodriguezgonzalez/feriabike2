import pool from "../db/connection.js";

const PublicacionesModel = {
  getPublicaciones: async (page, limit, search) => {
    try {
      const offset = (page - 1) * limit;
      let query =
        "SELECT * FROM publicaciones WHERE estado_publicacion = 'disponible' order by creado_en desc";
      let params = [];

      if (search) {
        query += " AND (titulo LIKE ? OR descripcion LIKE ?)";
        params = [`%${search}%`, `%${search}%`];
      }

      query += ` LIMIT ${limit} OFFSET ${offset}`;
      const result = await pool.query(query);
      const rows = result.rows;

      const countQuery =
        "SELECT COUNT(*) AS total FROM publicaciones WHERE estado_publicacion = 'disponible'";
      const countResult = await pool.query(countQuery);
      const total = countResult.rows[0].total;

      return { publicaciones: rows, total };
    } catch (error) {
      console.error("Error al obtener las publicaciones:", error);
      throw error;
    }
  },
  republicarPublicacion: async (id) => {
    try {
      const query = "UPDATE publicaciones SET estado_publicacion = 'disponible' WHERE id = $1";
      const result = await pool.query(query, [id]);
      return result.rowCount > 0;
    } catch (error) {
      console.error("Error al republicar la publicación:", error);
      throw error;
    }
  },
  marcarPublicacionComoVendida: async (id) => {
    try {
      const query = "UPDATE publicaciones SET estado_publicacion = 'vendido' WHERE id = $1";
      const result = await pool.query(query, [id]);
      return result.rowCount > 0;
    } catch (error) {
      console.error("Error al marcar la publicación como vendida:", error);
      throw error;
    }
  },
};

export default PublicacionesModel;
