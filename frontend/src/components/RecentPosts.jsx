import { useEffect, useState } from "react";
import { ENDPOINT } from "../config/constans";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

export default function RecentPosts() {
  const [publicaciones, setPublicaciones] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const response = await fetch(`${ENDPOINT.publicaciones}?page=1&limit=6`);
        const data = await response.json();
        setPublicaciones(data.publicaciones);
      } catch (error) {
        console.error("Error cargando publicaciones recientes:", error);
      }
    };

    fetchPublicaciones();
  }, []);

  const verDetalle = (id) => {
    navigate(`/publicaciones/${id}`);
  };

  return (
    <section id="gallery" className="px-8 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-700">
        Publicaciones Recientes
      </h2>

      {publicaciones.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {publicaciones.map((publi) => (
            <Card
              key={publi.id}
              title={publi.titulo}
              image={publi.imagen_url || "https://placehold.co/400x300?text=Sin+Imagen"}
              price={`$${publi.precio || "N/A"}`}
              onDetalleClick={() => verDetalle(publi.id)} // 👈 pasamos el manejador
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No hay publicaciones recientes disponibles.</p>
      )}
    </section>
  );
}