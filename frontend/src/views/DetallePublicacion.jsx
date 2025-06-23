import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Context from "../contexts/Context";
import { ENDPOINT } from "../config/constans";

const DetallePublicacion = () => {
  const { id } = useParams();
  const [publicacion, setPublicacion] = useState(null);
  const { getDeveloper } = useContext(Context);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const desdeNotificacion = searchParams.get("desdeNotificacion") === "true";

  const comprarPublicacion = async () => {
    if (!getDeveloper) {
      navigate("/login");
      return;
    }
    try {
      const token = window.sessionStorage.getItem("token");
      await axios.post(
        `${ENDPOINT.transacciones}`,
        {
          comprador_id: getDeveloper.id,
          vendedor_id: publicacion.usuario_id,
          publicacion_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("¡Compra realizada con éxito!");

      // Crear notificación para el comprador
      await axios.post(
        `${ENDPOINT.notificaciones}`,
        {
          usuario_id: getDeveloper.id,
          mensaje: `¡Has comprado ${publicacion.titulo}!`,
          link: `/publicaciones/${id}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Crear notificación para el vendedor
      await axios.post(
        `${ENDPOINT.notificaciones}`,
        {
          usuario_id: publicacion.usuario_id,
          mensaje: `¡Has vendido ${publicacion.titulo}!`,
          link: `/publicaciones/${id}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Actualizar el estado de la publicación a "vendido"
      await axios.put(
        `${ENDPOINT.publicaciones}/${id}/vendido`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

    } catch (error) {
      console.error(error);
      if (error.response?.status === 400) {
        alert("No puedes comprar tu propia publicación");
      } else {
        alert(`Hubo un error al realizar la compra: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  useEffect(() => {
    const obtenerPublicacion = async () => {
      try {
        const response = await axios.get(`${ENDPOINT.publicaciones}/${id}`);
        setPublicacion(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerPublicacion();
  }, [id]);

  if (!publicacion) {
    return <div className="text-center mt-10 text-gray-600">Cargando...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-4 text-green-600">{publicacion.titulo}</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={publicacion.imagen_url}
          alt={publicacion.titulo}
          className="w-full md:w-1/2 h-64 object-cover rounded shadow"
        />

        <div className="flex-1 space-y-4">
          <p className="text-gray-700 text-lg">{publicacion.descripcion}</p>
          <p className="text-xl font-semibold text-green-700">Precio: ${publicacion.precio}</p>
          <p className="text-gray-600">Estado del artículo: {publicacion.estado_articulo}</p>

          {!desdeNotificacion && (
            <div className="flex gap-4 mt-4">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                onClick={() => navigate(-1)}
              >
                Volver
              </button>

              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                onClick={comprarPublicacion}
              >
                Comprar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetallePublicacion;
