import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ENDPOINT } from "../config/constans";

const MisCompras = () => {
  const navigate = useNavigate();
  const [compras, setCompras] = useState([]);

  const obtenerCompras = async () => {
    try {
      const token = window.sessionStorage.getItem("token");
      const response = await axios.get(ENDPOINT.comprasUsuario, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCompras(response.data);
    } catch (error) {
      console.error(error);
      window.alert("Error al obtener las compras del usuario.");
    }
  };

  useEffect(() => {
    const token = window.sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    obtenerCompras();
  }, [navigate]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
        Mis Compras
      </h1>

      {compras.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {compras.map((compra) => (
            <div
              key={compra.id}
              className="bg-white border border-gray-200 shadow-md rounded-xl p-6 flex flex-col justify-between"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {compra.titulo}
              </h2>
              <p className="text-gray-600 mb-2">{compra.descripcion}</p>
              <p className="text-gray-900 font-bold mb-1">
                ${compra.precio}
              </p>
              <p className="text-sm text-gray-500 italic mb-4">
                Estado: {compra.estado_articulo === "nuevo" ? "Nuevo" : "Usado"}
              </p>
              <p className="text-sm text-gray-500 italic mb-4">
                Vendedor: {compra.vendedor_nombre} ({compra.vendedor_email}) - Teléfono: {compra.vendedor_telefono}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">
          No tienes compras aún.
        </p>
      )}
    </div>
  );
};

export default MisCompras;
