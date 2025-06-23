import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../contexts/Context";
import { ENDPOINT } from "../config/constans";

const Galeria = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const publicacionesPorPagina = 10;
  const { user } = useContext(Context);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPublicaciones();
  }, [currentPage, searchTerm]);

  const fetchPublicaciones = async () => {
    try {
      const url = `${ENDPOINT.publicaciones}?page=${currentPage}&limit=${publicacionesPorPagina}&search=${searchTerm}`;
      const response = await fetch(url);
      const data = await response.json();
      setPublicaciones(data.publicaciones);
      setTotalPages(Math.ceil(data.total / publicacionesPorPagina));
    } catch (error) {
      console.error("Error fetching publicaciones:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
        Galería de Publicaciones
      </h1>

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Buscar por título o descripción"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg text-sm">
          <thead className="bg-green-100 text-green-700">
            <tr>
              <th className="text-left px-6 py-3">Imagen</th>
              <th className="text-left px-6 py-3">Título</th>
              <th className="text-left px-6 py-3">Descripción</th>
              <th className="text-left px-6 py-3">Detalles</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {publicaciones && publicaciones.length > 0 ? (
              publicaciones.map((publicacion) => (
                <tr key={publicacion.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <Link to={`/publicaciones/${publicacion.id}`}>
                      <img
                        src={publicacion.imagen_url}
                        alt={publicacion.titulo}
  className="w-40 h-30 object-cover rounded-md shadow hover:scale-105 transition-transform duration-200"
                      />
                    </Link>
                  </td>
                  <td className="px-6 py-4 font-medium text-green-700">
                    <Link to={`/publicaciones/${publicacion.id}`} className="hover:underline">
                      {publicacion.titulo}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    {publicacion.descripcion.length > 100
                      ? publicacion.descripcion.substring(0, 100) + "..."
                      : publicacion.descripcion}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/publicaciones/${publicacion.id}`}
                      className="inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                    >
                      Ver Mas
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No se encontraron publicaciones.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            className={`px-4 py-2 rounded-full font-medium ${
              currentPage === pageNumber
                ? "bg-green-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setCurrentPage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Galeria;
