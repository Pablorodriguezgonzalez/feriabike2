import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ENDPOINT } from "../config/constans";

const PublicarArticulo = () => {
  const navigate = useNavigate();
  const [articulo, setArticulo] = useState({
    titulo: "",
    descripcion: "",
    precio: 0,
    imagen_url: "",
    estado_articulo: "nuevo",
    estado_publicacion: "disponible",
  });

  const handleArticulo = (event) => {
    setArticulo({ ...articulo, [event.target.name]: event.target.value });
  };

  const handleForm = async (event) => {
    event.preventDefault();

    const token = window.sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await axios.post(ENDPOINT.publicaciones, articulo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.alert("Artículo publicado con éxito 😀.");
      navigate("/mispublicaciones");
    } catch (error) {
      console.error(error);
      window.alert("Error al publicar el artículo 🙁.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
        Publicar Artículo
      </h1>

      <form onSubmit={handleForm} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Título</label>
          <input
            value={articulo.titulo}
            onChange={handleArticulo}
            type="text"
            name="titulo"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
            placeholder="Título del artículo"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Descripción</label>
          <textarea
            value={articulo.descripcion}
            onChange={handleArticulo}
            name="descripcion"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
            rows="4"
            placeholder="Descripción del artículo"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Precio</label>
          <input
            value={articulo.precio}
            onChange={handleArticulo}
            type="number"
            name="precio"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
            placeholder="Precio del artículo"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Imagen URL</label>
          <input
            value={articulo.imagen_url}
            onChange={handleArticulo}
            type="text"
            name="imagen_url"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
            placeholder="URL de la imagen del artículo"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Estado del artículo</label>
          <select
            value={articulo.estado_articulo}
            onChange={handleArticulo}
            name="estado_articulo"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
          >
            <option value="nuevo">Nuevo</option>
            <option value="usado">Usado</option>
          </select>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            Publicar
          </button>
        </div>
      </form>
    </div>
  );
};

export default PublicarArticulo;
