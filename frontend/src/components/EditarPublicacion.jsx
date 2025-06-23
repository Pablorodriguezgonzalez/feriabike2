import React, { useState, useEffect } from "react";
import axios from "axios";
import { ENDPOINT } from "../config/constans";

const EditarPublicacion = ({ publicacionId, onPublicacionActualizada }) => {
  const [publicacion, setPublicacion] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");

  useEffect(() => {
    const obtenerPublicacion = async () => {
      try {
        const token = window.sessionStorage.getItem("token");
        const response = await axios.get(
          `${ENDPOINT.publicaciones}/${publicacionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPublicacion(response.data);
        setTitulo(response.data.titulo);
        setContenido(response.data.contenido);
      } catch (error) {
        console.error("Error al obtener la publicación:", error);
        window.alert("Error al obtener la publicación.");
      }
    };

    obtenerPublicacion();
  }, [publicacionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = window.sessionStorage.getItem("token");
      console.log("Título:", titulo);
      console.log("Contenido:", contenido);
      await axios.put(
        `${ENDPOINT.publicaciones}/${publicacionId}`,
        { titulo, contenido },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onPublicacionActualizada();
      window.alert("Publicación actualizada correctamente.");
    } catch (error) {
      console.error("Error al actualizar la publicación:", error);
      window.alert("Error al actualizar la publicación.");
    }
  };

  if (!publicacion) {
    return <p>Cargando...</p>;
  }

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h2>Editar Publicación</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="contenido">Descripción:</label>
          <textarea
            id="contenido"
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="precio">Precio:</label>
          <input
            id="precio"
            type="number"
            onChange={(e) => setContenido(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="imagen">Imagen URL:</label>
          <input
            type="text"
            id="imagen"
            onChange={(e) => setTitulo(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="estado">Estado:</label>
          <input
            type="text"
            id="estado"
            onChange={(e) => setTitulo(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button className="btn btn-success" type="submit">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};
export default EditarPublicacion;
