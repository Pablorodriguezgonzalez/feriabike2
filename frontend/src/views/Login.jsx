import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ENDPOINT } from "../config/constans";
import Context from "../contexts/Context";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const initialForm = { email: "", password: "" };

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(initialForm);
  const { setDeveloper } = useContext(Context);

  const handleUser = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleForm = async (e) => {
    e.preventDefault();

    if (!user.email.trim() || !user.password.trim()) {
      return window.alert("Email y password obligatorios.");
    }

    if (!emailRegex.test(user.email)) {
      return window.alert("El formato del email no es correcto!");
    }

    try {
      const { data } = await axios.post(ENDPOINT.login, user);
      window.sessionStorage.setItem("token", data.token);
      setDeveloper({});
      navigate("/perfil");
    } catch ({ response: { data } }) {
      console.error(data);
      window.alert(`${data.message} 🙁.`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleForm}
        className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
          Iniciar Sesión
        </h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
            Email
          </label>
          <input
            value={user.email}
            onChange={handleUser}
            type="email"
            name="email"
            id="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="usuario@feriabike.cl"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
            Contraseña
          </label>
          <input
            value={user.password}
            onChange={handleUser}
            type="password"
            name="password"
            id="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="********"
          />
        </div>
< p/>
        {/* <div className="text-right mb-4">
          <Link
            to="/recuperar"
            className="text-sm text-green-600 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
 */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
        >
          Iniciar Sesión
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link
            to="/registrarse"
            className="text-green-600 font-medium hover:underline"
          >
            Regístrate aquí
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
