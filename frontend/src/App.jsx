import Context from "./contexts/Context";
import useDeveloper from "./hooks/useDeveloper";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Registro from "./views/Register";
import Login from "./views/Login";
import Perfil from "./views/Profile";
import MisPublicaciones from "./views/MisPublicaciones";
import PublicarArticulo from "./views/PublicarArticulo";
import DetallePublicacion from "./views/DetallePublicacion";
import Notificaciones from "./components/Notificaciones";
import Galeria from "./views/Galeria";
import MisVentas from "./views/MisVentas";
import MisCompras from "./views/MisCompras";

const App = () => {
  const globalState = useDeveloper();

  return (
    <Context.Provider value={globalState}>
      <BrowserRouter>
        <div className="bg-sky-50 text-gray-800 min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/registrarse" element={<Registro />} />
              <Route path="/login" element={<Login />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/mispublicaciones" element={<MisPublicaciones />} />
              <Route path="/publicararticulo" element={<PublicarArticulo />} />
              <Route path="/publicaciones/:id" element={<DetallePublicacion />} />
              <Route path="/notificaciones" element={<Notificaciones />} />
              <Route path="/galeria" element={<Galeria />} />
              <Route path="/misventas" element={<MisVentas />} />
              <Route path="/miscompras" element={<MisCompras />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </Context.Provider>
  );
};

export default App;
