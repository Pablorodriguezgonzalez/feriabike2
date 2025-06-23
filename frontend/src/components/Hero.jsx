
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-green-100 py-20 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-6">
          Bienvenido a Feria Bike, el Marketplace de Bicicletas y Accesorios
        </h1>
        <p className="text-gray-700 text-lg mb-8">
          Encuentra o publica artículos relacionados con el ciclismo. Accesorios, bicicletas, repuestos y más.
        </p>
        <Link
          to="/galeria"
          className="inline-block bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-6 rounded-full transition duration-300"
        >
          Ver Publicaciones
        </Link>
      </div>
    </section>
  );
}
