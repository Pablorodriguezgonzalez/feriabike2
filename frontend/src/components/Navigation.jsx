import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Context from "../contexts/Context";

const Navigation = () => {
  const navigate = useNavigate();
  const { getDeveloper, setDeveloper } = useContext(Context);

  const logout = () => {
    setDeveloper();
    window.sessionStorage.removeItem("token");
    navigate("/");
  };

  const isLogin = () => {
    if (!getDeveloper) {
      return (
        <>
          <Link to="/registrarse" className="btn m-1 register-btn">
            Registrarse
          </Link>
          <Link to="/login" className="btn login-btn">
            Iniciar Sesión
          </Link>
        </>
      );
    }

    return (
      <>
        <Link to="/perfil" className="btn m-1 btn-light">
          Mi Perfil
        </Link>
        <Link to="/mispublicaciones" className="btn m-1 btn-light">
          Mis Publicaciones
        </Link>
        <Link to="/notificaciones" className="btn m-1 btn-light">
          Notificaciones
        </Link>
        <Link to="/publicararticulo" className="btn m-1 btn-light">
          Publicar Articulo
        </Link>
        <Link to="/galeria" className="btn m-1 btn-light">
          Galería
        </Link>
        <button onClick={logout} className="btn btn-danger">
          Salir
        </button>
      </>
    );
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        FB
      </Link>
      <Link to="/" className="nombre-feria">
        Feria Bike
      </Link>
      <div className="opciones">{isLogin()}</div>
    </nav>
  );
};

export default Navigation;
