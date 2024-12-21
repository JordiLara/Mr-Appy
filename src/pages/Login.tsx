import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        formData
      );
      console.log("Login exitoso", response.data);
      
      navigate("/dashboard");
    } catch (error: any) {
      console.error(
        "Error al iniciar sesión",
        error.response?.data || error.message
      );
      setError(error.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleInputChange}
          required
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
