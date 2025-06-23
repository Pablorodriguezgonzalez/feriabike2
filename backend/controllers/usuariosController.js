import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import {
  registrarUsuario,
  obtenerUsuarioPorEmail,
  crearPublicacion,
  obtenerPublicacionesPorUsuario,
  obtenerPublicacionesRecientes,
  obtenerPublicacionPorId,
  actualizarPublicacion,
  eliminarPublicacion,
  crearTransaccion as crearTransaccionModel,
  actualizarPublicacion as actualizarPublicacionModel,
  crearNotificacion,
  obtenerVentasPorUsuario,
  obtenerComprasPorUsuario,
  actualizarEstadoPublicacion,
} from "../models/usuariosModel.js";
import {
  getNotificacionesByUsuarioId,
  marcarNotificacionComoLeida,
} from "../models/notificacionesModel.js";

export const finalizarPublicacionController = async (req, res) => {
  try {
    const { id } = req.params;
    const publicacionActualizada = await actualizarEstadoPublicacion(id, "finalizado");
    if (!publicacionActualizada) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }
    res.json(publicacionActualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al finalizar la publicación" });
  }
};

export const republicarPublicacionController = async (req, res) => {
  try {
    const { id } = req.params;
    const publicacionActualizada = await actualizarEstadoPublicacion(id, "disponible");
    if (!publicacionActualizada) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }
    res.json(publicacionActualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al republicar la publicación" });
  }
};

export const getVentasUsuario = async (req, res) => {
  try {
    const { email } = req.user;
    const usuario = await obtenerUsuarioPorEmail(email);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const ventas = await obtenerVentasPorUsuario(usuario.id);
    res.json(ventas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las ventas del usuario" });
  }
};

export const getComprasUsuario = async (req, res) => {
  try {
    const { email } = req.user;
    const usuario = await obtenerUsuarioPorEmail(email);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const compras = await obtenerComprasPorUsuario(usuario.id);
    res.json(compras);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las compras del usuario" });
  }
};

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
  try {
    const { email, password, nombre, telefono } = req.body;
    const usuarioExistente = await obtenerUsuarioPorEmail(email);
    if (usuarioExistente)
      return res
        .status(400)
        .json({ message: "El correo electrónico ya está registrado" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = await registrarUsuario({
      email,
      password: hashedPassword,
      nombre: nombre,
      telefono: telefono,
    });

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await obtenerUsuarioPorEmail(email);
    if (!usuario)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido)
      return res.status(401).json({ message: "Credenciales inválidas" });

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: 3600 });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error en login" });
  }
};

export const getUsuario = async (req, res) => {
  try {
    const { email } = req.user;
    const usuario = await obtenerUsuarioPorEmail(email);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const { password, ...usuarioSinPassword } = usuario;
    res.json([usuarioSinPassword]);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener datos del usuario" });
  }
};

export const getPublicacionesUsuario = async (req, res) => {
  try {
    const { email } = req.user;
    const usuario = await obtenerUsuarioPorEmail(email);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const publicaciones = await obtenerPublicacionesPorUsuario(usuario.id);
    res.json(publicaciones);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener las publicaciones del usuario" });
  }
};

export const crearPublicacionController = async (req, res) => {
  try {
    const { titulo, descripcion, precio, imagen_url, estado_articulo } =
      req.body;
    const { email } = req.user;

    const usuario = await obtenerUsuarioPorEmail(email);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const nuevaPublicacion = await crearPublicacion({
      titulo,
      descripcion,
      precio,
      imagen_url,
      estado_articulo,
      estado_publicacion: "disponible",
      usuario_id: usuario.id,
    });

    await crearNotificacion(
      usuario.id,
      "¡Recibiste una pregunta sobre tu publicación!"
    );

    res.status(201).json(nuevaPublicacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la publicación" });
  }
};

export const getPublicacionPorIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const publicacion = await obtenerPublicacionPorId(id);
    if (!publicacion) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }
    res.json(publicacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la publicación" });
  }
};

export const getPublicacionesRecientes = async (req, res) => {
  try {
    const publicaciones = await obtenerPublicacionesRecientes();
    res.json(publicaciones);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener las publicaciones recientes" });
  }
};

export const actualizarPublicacionController = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, precio, imagen_url, estado_articulo } =
      req.body;
    console.log("req.body", req.body);

    const camposActualizados = {};
    if (titulo) {
      camposActualizados.titulo = titulo;
    }
    if (descripcion) {
      camposActualizados.descripcion = descripcion;
    }
    if (precio) {
      camposActualizados.precio = precio;
    }
    if (imagen_url) {
      camposActualizados.imagen_url = imagen_url;
    }
    if (estado_articulo) {
      camposActualizados.estado_articulo = estado_articulo;
    }

    const publicacionActualizada = await actualizarPublicacion(
      id,
      camposActualizados
    );

    if (!publicacionActualizada) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    res.json(publicacionActualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la publicación" });
  }
};

export const eliminarPublicacionController = async (req, res) => {
  try {
    const { id } = req.params;
    const publicacionEliminada = await eliminarPublicacion(id);

    if (!publicacionEliminada) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    res.status(200).json({ message: "Publicación eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la publicación" });
  }
};

export const getNotificaciones = async (req, res) => {
  try {
    const { email } = req.user;
    const usuario = await obtenerUsuarioPorEmail(email);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const notificaciones = await getNotificacionesByUsuarioId(usuario.id);
    res.json(notificaciones);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener las notificaciones del usuario" });
  }
};

export const crearTransaccion = async (req, res) => {
  try {
    const { comprador_id, vendedor_id, publicacion_id } = req.body;

    // Obtener la publicación para verificar si el comprador es el mismo que el vendedor
    const publicacion = await obtenerPublicacionPorId(publicacion_id);
    if (!publicacion) {
      return res.status(404).json({ message: "Publicación no encontrada" });
    }

    if (publicacion.usuario_id === comprador_id) {
      return res
        .status(400)
        .json({ message: "No puedes comprar tu propia publicación" });
    }

    const nuevaTransaccion = await crearTransaccionModel({
      comprador_id,
      vendedor_id,
      publicacion_id,
      fecha_hora: new Date(),
    });

    res.status(201).json(nuevaTransaccion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la transacción" });
  }
};
