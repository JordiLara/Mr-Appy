import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Building2, Users, Briefcase } from "lucide-react";
import { authService } from "../services/api";
import AuthLayout from "../auth/AuthLayout";
import FormInput from "../components/FormInput";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    surname: "",
    companyName: "",
    teamName: "",
    employeeRole: "",
    roles: "manager",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      setIsLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...registerData } = formData;
      const user = await authService.register(registerData);

      setSuccess("Usuario registrado correctamente");

      setTimeout(() => {
        if (user.roles === "manager") {
          navigate("/manager/managerdashboard");
        } else {
          navigate("/activity");
        }
      }, 2000);
    } catch (err: any) {
      if (!success) {
        setError(err.response?.data?.message || "Error al registrar usuario");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Crear cuenta de Manager">
      {error && !success && (
        <div className="bg-red-500/10 text-red-100 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-500/10 text-green-100 p-4 rounded-lg mb-6">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormInput
            name="name"
            type="text"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleInputChange}
            icon={User}
          />
          <FormInput
            name="surname"
            type="text"
            placeholder="Apellido"
            value={formData.surname}
            onChange={handleInputChange}
            icon={User}
          />
          <FormInput
            name="email"
            type="email"
            placeholder="Correo Electrónico"
            value={formData.email}
            onChange={handleInputChange}
            icon={Mail}
          />
          <FormInput
            name="password"
            type="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleInputChange}
            icon={Lock}
          />
          <FormInput
            name="confirmPassword"
            type="password"
            placeholder="Confirmar Contraseña"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            icon={Lock}
          />
          <FormInput
            name="companyName"
            type="text"
            placeholder="Nombre de la Empresa"
            value={formData.companyName}
            onChange={handleInputChange}
            icon={Building2}
          />
          <FormInput
            name="teamName"
            type="text"
            placeholder="Nombre del Equipo"
            value={formData.teamName}
            onChange={handleInputChange}
            icon={Users}
          />
          <FormInput
            name="employeeRole"
            type="text"
            placeholder="Rol en la Empresa"
            value={formData.employeeRole}
            onChange={handleInputChange}
            icon={Briefcase}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-lg
            transition-colors disabled:opacity-50 mt-8"
        >
          {isLoading ? "Registrando..." : "Crear cuenta"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-white">
        ¿Ya tienes una cuenta?{" "}
        <Link
          to="/login"
          className="text-yellow-400 hover:text-yellow-300 font-medium"
        >
          Inicia sesión
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;
