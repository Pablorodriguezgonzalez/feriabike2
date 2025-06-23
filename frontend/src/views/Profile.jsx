import axios from "axios";
import Context from "../contexts/Context";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ENDPOINT } from "../config/constans";
import Notificaciones from "../components/Notificaciones";

const Profile = () => {
  const navigate = useNavigate();
  const { getDeveloper, setDeveloper } = useContext(Context);

  const getDeveloperData = () => {
    const token = window.sessionStorage.getItem("token");
    axios
      .get(ENDPOINT.users, { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data: [user] }) => setDeveloper({ ...user }))
      .catch(({ response: { data } }) => {
        console.error(data);
        window.sessionStorage.removeItem("token");
        setDeveloper(null);
        navigate("/");
      });
  };

  useEffect(getDeveloperData, []);

  return (
    <div className="px-4 py-6 sm:px-6 md:px-8 lg:px-10 max-w-5xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-green-700 mb-2">
          Bienvenido,{" "}
          <span className="text-gray-800">{getDeveloper?.nombre}</span>
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Este es tu panel de perfil. Aquí puedes ver tus notificaciones y acceder a funcionalidades relacionadas con tu cuenta.
        </p>
      </div>
      {/* <Notificaciones /> */}
    </div>
  );
};

export default Profile;
