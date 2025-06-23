import pool from "../db/connection.js";

const registrarUsuario = async (usuario) => {
  const { email, password, nombre, telefono } = usuario;
  const query =
    "INSERT INTO usuarios (email, password, nombre, telefono) VALUES ($1, $2, $3, $4) RETURNING *";
  const values = [email, password, nombre, telefono];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const obtenerUsuarioPorEmail = async (email) => {
  const query = "SELECT * FROM usuarios WHERE email = $1";
  const values = [email];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const crearPublicacion = async (publicacion) => {
  const {
    titulo,
    descripcion,
    precio,
    imagen_url,
    estado_articulo,
    estado_publicacion,
    usuario_id,
  } = publicacion;
  const query = `
    INSERT INTO publicaciones (titulo, descripcion, precio, imagen_url, estado_articulo, estado_publicacion, usuario_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;
  const values = [
    titulo,
    descripcion,
    precio,
    imagen_url,
    estado_articulo,
    estado_publicacion,
    usuario_id,
  ];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const obtenerPublicacionesPorUsuario = async (usuarioId) => {
  const query = "SELECT * FROM publicaciones WHERE usuario_id = $1 ORDER BY creado_en";
  const values = [usuarioId];
  const result = await pool.query(query, values);
  return result.rows;
};

const obtenerPublicacionesRecientes = async () => {
  const query = "SELECT * FROM publicaciones ORDER BY creado_en DESC limit 6";
  const result = await pool.query(query);
  return result.rows;
};

const obtenerPublicacionPorId = async (id) => {
  const query = "SELECT * FROM publicaciones WHERE id = $1";
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const actualizarPublicacion = async (id, publicacion) => {
  let query = "UPDATE publicaciones SET ";
  const values = [];
  let index = 1;

  for (const key in publicacion) {
    if (publicacion.hasOwnProperty(key)) {
      if (key === "contenido") {
        query += `descripcion = $${index}, `;
        values.push(publicacion[key]);
        index++;
      } else {
        query += `${key} = $${index}, `;
        values.push(publicacion[key]);
        index++;
      }
    }
  }

  query = query.slice(0, -2);
  query += ` WHERE id = $${index} RETURNING *`;
  values.push(id);

  console.log("Query:", query);
  console.log("Values:", values);

  const result = await pool.query(query, values);
  return result.rows[0];
};

const eliminarPublicacion = async (id) => {
  const query = "DELETE FROM publicaciones WHERE id = $1 RETURNING *";
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
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

const crearTransaccion = async (transaccion) => {
  const { comprador_id, vendedor_id, publicacion_id, fecha_hora } = transaccion;
  const query = `
    INSERT INTO transacciones (comprador_id, vendedor_id, publicacion_id, fecha_hora)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const values = [comprador_id, vendedor_id, publicacion_id, fecha_hora];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const obtenerVentasPorUsuario = async (usuarioId) => {
  const query = `
    SELECT t.*, p.titulo, p.descripcion, p.precio, p.imagen_url, p.estado_articulo,
    u.nombre AS comprador_nombre, u.email AS comprador_email, u.telefono AS comprador_telefono
    FROM transacciones t
    INNER JOIN publicaciones p ON t.publicacion_id = p.id
    INNER JOIN usuarios u ON t.comprador_id = u.id
    WHERE t.vendedor_id = $1
  `;
  const values = [usuarioId];
  const result = await pool.query(query, values);
  return result.rows;
};

const obtenerComprasPorUsuario = async (usuarioId) => {
  const query = `
    SELECT t.*, p.titulo, p.descripcion, p.precio, p.imagen_url, p.estado_articulo,
    u.nombre AS vendedor_nombre, u.email AS vendedor_email, u.telefono AS vendedor_telefono
    FROM transacciones t
    INNER JOIN publicaciones p ON t.publicacion_id = p.id
    INNER JOIN usuarios u ON t.vendedor_id = u.id
    WHERE t.comprador_id = $1
  `;
  const values = [usuarioId];
  const result = await pool.query(query, values);
  return result.rows;
};

const actualizarEstadoPublicacion = async (id, estado_publicacion) => {
  const query = `
    UPDATE publicaciones
    SET estado_publicacion = $1
    WHERE id = $2
    RETURNING *
  `;
  const values = [estado_publicacion, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export {
  registrarUsuario,
  obtenerUsuarioPorEmail,
  crearPublicacion,
  obtenerPublicacionesPorUsuario,
  obtenerPublicacionesRecientes,
  obtenerPublicacionPorId,
  actualizarPublicacion,
  eliminarPublicacion,
  crearNotificacion,
  crearTransaccion,
  obtenerVentasPorUsuario,
  obtenerComprasPorUsuario,
  actualizarEstadoPublicacion,
};
