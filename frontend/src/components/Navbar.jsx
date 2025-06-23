import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, User, LogIn, PlusCircle, Bell, Image } from "lucide-react";
import Context from "../contexts/Context";

export default function Navbar() {
  const navigate = useNavigate();
  const { getDeveloper, setDeveloper } = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    setDeveloper();
    window.sessionStorage.removeItem("token");
    navigate("/");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const guestLinks = (
    <>
      <li>
        <Link to="/login" className="flex items-center gap-1 hover:text-green-600">
          <LogIn size={18} /> Iniciar Sesión
        </Link>
      </li>
      <li>
        <Link to="/registrarse" className="flex items-center gap-1 hover:text-green-600">
          <User size={18} /> Registrarse
        </Link>
      </li>
    </>
  );

  const userLinks = (
    <>
      <li>
        <Link to="/perfil" className="flex items-center gap-1 hover:text-green-600">
          <User size={18} /> Perfil
        </Link>
      </li>
      <li>
        <Link to="/mispublicaciones" className="flex items-center gap-1 hover:text-green-600">
          <Image size={18} /> Mis Publicaciones
        </Link>
      </li>
      <li>
        <Link to="/misventas" className="flex items-center gap-1 hover:text-green-600">
          <Image size={18} /> Mis Ventas
        </Link>
      </li>
      <li>
        <Link to="/miscompras" className="flex items-center gap-1 hover:text-green-600">
          <Image size={18} /> Mis Compras
        </Link>
      </li>
      <li>
        <Link to="/notificaciones" className="flex items-center gap-1 hover:text-green-600">
          <Bell size={18} /> Notificaciones
        </Link>
      </li>
      <li>
        <Link to="/publicararticulo" className="flex items-center gap-1 hover:text-green-600">
          <PlusCircle size={18} /> Publicar
        </Link>
      </li>
      <li>
        <Link to="/galeria" className="flex items-center gap-1 hover:text-green-600">
          <Image size={18} /> Galería
        </Link>
      </li>
      <li>
        <button onClick={logout} className="flex items-center gap-1 text-red-600 hover:underline">
          <LogOut size={18} /> Salir
        </button>
      </li>
    </>
  );

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-green-600">
        FeriaBike
      </Link>

      <button onClick={toggleMenu} className="md:hidden text-gray-700">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <ul className={`md:flex space-x-6 items-center hidden`}>
        <li>
          <Link to="/" className="hover:text-green-600">Inicio</Link>
        </li>
        {getDeveloper ? userLinks.props.children : guestLinks.props.children}
      </ul>

      {/* Menú móvil */}
      {isOpen && (
        <ul className="md:hidden flex flex-col gap-3 mt-4 bg-white p-4 rounded shadow absolute top-16 right-6 w-56 z-50">
          <li>
            <Link to="/" className="hover:text-green-600" onClick={toggleMenu}>
              Inicio
            </Link>
          </li>
          {(getDeveloper ? userLinks : guestLinks).props.children.map((item, index) => (
            <li key={index} onClick={toggleMenu}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
