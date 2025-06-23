import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ENDPOINT } from "../config/constans";
import { useNavigate } from "react-router-dom";
import Context from "../contexts/Context";

function Notificaciones() {
  const [notificaciones, setNotificaciones] = useState([]);
  const navigate = useNavigate();
  const { getDeveloper } = useContext(Context);

  const irAPublicacion = async (ruta, id) => {
    try {
      const token = window.sessionStorage.getItem("token");
      await axios.get(`${ENDPOINT.publicaciones}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate(`${ruta}?desdeNotificacion=true`);
    } catch (error) {
      console.error(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!getDeveloper) {
      navigate("/");
      return;
    }
  }, [getDeveloper, navigate]);

  const getNotificaciones = async () => {
    try {
      const token = window.sessionStorage.getItem("token");
      const response = await axios.get(ENDPOINT.notificaciones, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotificaciones(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNotificaciones();
  }, []);

  const marcarComoLeida = async (id) => {
    try {
      const token = window.sessionStorage.getItem("token");
      await axios.put(
        `${ENDPOINT.notificaciones}/${id}/leido`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      getNotificaciones();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
        Notificaciones
      </h2>

      {notificaciones.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-green-100 text-green-800 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Mensaje</th>
                <th className="px-6 py-3 text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              {notificaciones.map((notificacion) => (
                <tr key={notificacion.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        irAPublicacion(
                          notificacion.link,
                          notificacion.link?.split("/").pop()
                        )
                      }
                      className="text-blue-600 hover:underline text-left w-full"
                    >
                      {notificacion.mensaje}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => marcarComoLeida(notificacion.id)}
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md transition-colors"
                    >
                      Marcar como leída
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg mt-6">
          No tienes notificaciones pendientes.
        </p>
      )}
    </div>
  );
}

export default Notificaciones;

/* import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ENDPOINT } from "../config/constans";
import { useNavigate, Link } from "react-router-dom";
import Context from "../contexts/Context";

function Notificaciones() {
  const [notificaciones, setNotificaciones] = useState([]);
  const navigate = useNavigate();
  const { getDeveloper } = useContext(Context);

  const irAPublicacion = async (id) => {
    try {
      const token = window.sessionStorage.getItem("token");
      // Realizar una petición GET al backend para verificar la autenticación
      await axios.get(`${ENDPOINT.publicaciones}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Redirigir al usuario a la página del producto
      navigate(`/publicaciones/${id}?desdeNotificacion=true`);
    } catch (error) {
      console.error(error);
      // Si hay un error, redirigir al usuario a la página de inicio de sesión
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!getDeveloper) {
      navigate("/");
      return;
    }
  }, [getDeveloper, navigate]);

  const getNotificaciones = async () => {
    try {
      const token = window.sessionStorage.getItem("token");
      const response = await axios.get(ENDPOINT.notificaciones, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotificaciones(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNotificaciones();
  }, []);

  const marcarComoLeida = async (id) => {
    try {
      const token = window.sessionStorage.getItem("token");
      await axios.put(
        `${ENDPOINT.notificaciones}/${id}/leido`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      getNotificaciones();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
        Notificaciones
      </h2>

      {notificaciones.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-green-100 text-green-800 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Mensaje</th>
                <th className="px-6 py-3 text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              {notificaciones.map((notificacion) => (
                <tr key={notificacion.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    {notificacion.mensaje.split(" ").map((word, index) => {
                      if (word.startsWith("/")) {
                        return (
                          <button
                            key={index}
                            onClick={() => irAPublicacion(notificacion.mensaje.split("/")[2])}
                            className="text-blue-500 hover:underline"
                          >
                            {word}
                          </button>
                        );
                      }
                      return word + " ";
                    })}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => marcarComoLeida(notificacion.id)}
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md transition-colors"
                    >
                      Marcar como leída
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg mt-6">
          No tienes notificaciones pendientes.
        </p>
      )}
    </div>
  );
}

export default Notificaciones;
 */