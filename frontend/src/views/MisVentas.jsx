import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ENDPOINT } from "../config/constans";

const MisVentas = () => {
  const navigate = useNavigate();
  const [ventas, setVentas] = useState([]);

  const obtenerVentas = async () => {
    try {
      const token = window.sessionStorage.getItem("token");
      const response = await axios.get(ENDPOINT.ventasUsuario, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVentas(response.data);
    } catch (error) {
      console.error(error);
      window.alert("Error al obtener las ventas del usuario.");
    }
  };

  useEffect(() => {
    const token = window.sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    obtenerVentas();
  }, [navigate]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
        Mis Ventas
      </h1>

      {ventas.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {ventas.map((venta) => (
            <div
              key={venta.id}
              className="bg-white border border-gray-200 shadow-md rounded-xl p-6 flex flex-col justify-between"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {venta.titulo}
              </h2>
              <p className="text-gray-600 mb-2">{venta.descripcion}</p>
              <p className="text-gray-900 font-bold mb-1">
                ${venta.precio}
              </p>
              <p className="text-sm text-gray-500 italic mb-4">
                Estado: {venta.estado_articulo === "nuevo" ? "Nuevo" : "Usado"}
              </p>
              <p className="text-sm text-gray-500 italic mb-4">
                Comprador: {venta.comprador_nombre} ({venta.comprador_email}) - Teléfono: {venta.comprador_telefono}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">
          No tienes ventas aún.
        </p>
      )}
    </div>
  );
};

export default MisVentas;
