import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ENDPOINT } from "../config/constans";

const MisPublicaciones = () => {
  const navigate = useNavigate();
  const [publicaciones, setPublicaciones] = useState([]);
  const [publicacionEditando, setPublicacionEditando] = useState(null);
  const [formulario, setFormulario] = useState({});

  const obtenerPublicaciones = async () => {
    try {
      const token = window.sessionStorage.getItem("token");
      const response = await axios.get(ENDPOINT.publicacionesUsuario, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPublicaciones(response.data);
    } catch (error) {
      console.error(error);
      window.alert("Error al obtener las publicaciones.");
    }
  };

  useEffect(() => {
    const token = window.sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    obtenerPublicaciones();
  }, [navigate]);

  const handleModificar = (publicacion) => {
    setPublicacionEditando(publicacion.id);
    setFormulario({
      titulo: publicacion.titulo,
      descripcion: publicacion.descripcion || "",
      imagen_url: publicacion.imagen_url || "",
      precio: publicacion.precio || "",
      estado_articulo: publicacion.estado_articulo || "nuevo",
    });
  };

  const handleEliminar = async (id) => {
    try {
      const token = window.sessionStorage.getItem("token");
      await axios.delete(`${ENDPOINT.publicaciones}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      obtenerPublicaciones();
      window.alert("Publicación eliminada correctamente.");
    } catch (error) {
      console.error("Error al eliminar la publicación:", error);
      window.alert("Error al eliminar la publicación.");
    }
  };

  const handleFinalizar = async (id) => {
    try {
      const token = window.sessionStorage.getItem("token");
      await axios.put(`${ENDPOINT.publicaciones}/${id}/finalizar`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      obtenerPublicaciones();
      window.alert("Publicación finalizada correctamente.");
    } catch (error) {
      console.error("Error al finalizar la publicación:", error);
      window.alert("Error al finalizar la publicación.");
    }
  };

  const handleRepublicar = async (id) => {
    try {
      const token = window.sessionStorage.getItem("token");
      await axios.put(`${ENDPOINT.publicaciones}/${id}/disponible`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      obtenerPublicaciones();
      window.alert("Publicación republicada correctamente.");
    } catch (error) {
      console.error("Error al republicar la publicación:", error);
      window.alert("Error al republicar la publicación.");
    }
  };

  const handleGuardar = async (id) => {
    try {
      const token = window.sessionStorage.getItem("token");
      await axios.put(`${ENDPOINT.publicaciones}/${id}`, formulario, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPublicacionEditando(null);
      obtenerPublicaciones();
    } catch (error) {
      console.error("Error al actualizar la publicación:", error);
      window.alert("Error al actualizar la publicación.");
    }
  };

  const handleCancelar = () => {
    setPublicacionEditando(null);
    setFormulario({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
        Mis Publicaciones
      </h1>

      {publicaciones.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {publicaciones.map((publicacion) => (
            <div
              key={publicacion.id}
              className={`bg-white border border-gray-200 shadow-md rounded-xl p-6 flex flex-col justify-between ${
                publicacion.estado_publicacion === "finalizado" ? "opacity-50" : ""
              }`}
            >
              {publicacionEditando === publicacion.id ? (
                <>
                  <input
                    type="text"
                    name="titulo"
                    value={formulario.titulo}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mb-2"
                    placeholder="Título"
                  />
                  <textarea
                    name="descripcion"
                    value={formulario.descripcion}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mb-2"
                    placeholder="Descripción"
                  />
                  <input
                    type="text"
                    name="imagen_url"
                    value={formulario.imagen_url}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mb-2"
                    placeholder="URL de la imagen"
                  />
                  <input
                    type="number"
                    name="precio"
                    value={formulario.precio}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mb-2"
                    placeholder="Precio"
                  />
                  <select
                    name="estado_articulo"
                    value={formulario.estado_articulo}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded mb-4"
                  >
                    <option value="nuevo">Nuevo</option>
                    <option value="usado">Usado</option>
                  </select>
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => handleGuardar(publicacion.id)}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={handleCancelar}
                      className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                    >
                      Cancelar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {publicacion.imagen_url && (
                    <img
                      src={publicacion.imagen_url}
                      alt={publicacion.titulo}
                      className="w-full h-48 object-cover rounded mb-4"
                    />
                  )}
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {publicacion.titulo}
                  </h2>
                  <p className="text-gray-600 mb-2">{publicacion.descripcion}</p>
                  <p className="text-gray-900 font-bold mb-1">
                    ${publicacion.precio}
                  </p>
                  <p className="text-sm text-gray-500 italic mb-4">
                    Estado: {publicacion.estado_articulo === "nuevo" ? "Nuevo" : "Usado"}
                  </p>
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => handleModificar(publicacion)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      Modificar
                    </button>
                    {publicacion.estado_publicacion !== "finalizado" && (
                      <button
                        onClick={() => handleFinalizar(publicacion.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                      >
                        Finalizar
                      </button>
                    )}
                    {publicacion.estado_publicacion !== "disponible" && (
                      <button
                        onClick={() => handleRepublicar(publicacion.id)}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                      >
                        Republicar
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">
          No tienes publicaciones aún.
        </p>
      )}
    </div>
  );
};

export default MisPublicaciones;
