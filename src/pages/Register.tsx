import axios from "axios";
import { useState } from "react";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
    role: "user",
  });

  const [error, setError] = useState("");

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        formData
      );
      console.log("Usuario registrado", response.data);
      alert("usuario registrado");
    } catch (error: any) {
      console.error(
        "Error al registrar usuario",
        error.response?.data || error.message
      );
      setError(error.response?.data?.message || "Error al registrar usuario");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Register</h2>
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
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          name="surname"
          placeholder="Apellido"
          value={formData.surname}
          onChange={handleInputChange}
          required
          className="w-full p-2 mb-4 border rounded"
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="user">Usuario</option>
          <option value="manager">Manager</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;