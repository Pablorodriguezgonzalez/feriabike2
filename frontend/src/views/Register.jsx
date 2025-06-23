import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ENDPOINT } from "../config/constans";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const initialForm = {
  email: "",
  password: "",
  nombre: "",
  telefono: "",
};

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(initialForm);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUser = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);

  const handleForm = async (e) => {
    e.preventDefault();

    if (
      !user.email.trim() ||
      !user.password.trim() ||
      !user.nombre.trim() ||
      !user.telefono.trim()
    ) {
      return window.alert("Todos los campos son obligatorios.");
    }

    if (user.telefono.length > 10) {
      return window.alert("El número de teléfono no puede tener más de 10 dígitos.");
    }

    if (!emailRegex.test(user.email)) {
      return window.alert("El formato del email no es correcto!");
    }

    if (user.password !== confirmPassword) {
      return window.alert("Las contraseñas no coinciden!");
    }

    try {
      await axios.post(ENDPOINT.users, user);
      window.alert("Usuario registrado con éxito 😀.");
      navigate("/login");
    } catch ({ response: { data } }) {
      console.error(data);
      window.alert(`${data.message} 🙁.`);
    }
  };

  useEffect(() => {
    if (window.sessionStorage.getItem("token")) {
      navigate("/perfil");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleForm}
        className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
          Crear Cuenta
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Email
          </label>
          <input
            value={user.email}
            onChange={handleUser}
            type="email"
            name="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="usuario@feriabike.cl"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Contraseña
          </label>
          <input
            value={user.password}
            onChange={handleUser}
            type="password"
            name="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="********"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Confirmar Contraseña
          </label>
          <input
            value={confirmPassword}
            onChange={handleConfirmPassword}
            type="password"
            name="confirmPassword"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="********"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Nombre</label>
          <input
            value={user.nombre}
            onChange={handleUser}
            type="text"
            name="nombre"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Tu nombre completo"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Teléfono</label>
          <input
            value={user.telefono}
            onChange={handleUser}
            type="number"
            name="telefono"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Tu número de teléfono"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
        >
          Registrarme
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <Link
            to="/login"
            className="text-green-600 font-medium hover:underline"
          >
            Inicia sesión aquí
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
