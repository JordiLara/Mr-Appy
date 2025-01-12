import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Mail, Lock, User, Briefcase } from "lucide-react";
import AuthLayout from "../auth/AuthLayout";
import FormInput from "../components/FormInput";
import { authService } from "../services/api/authService";

interface TeamMemberFormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  surname: string;
  employeeRole: string;
}

export default function TeamMemberRegister() {
  const navigate = useNavigate();
  const { teamId } = useParams();
  const [formData, setFormData] = useState<TeamMemberFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    surname: "",
    employeeRole: "",
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
      if (!teamId) {
        throw new Error("ID de equipo no proporcionado");
      }

      const { confirmPassword, ...registrationData } = formData;

      await authService.register({
        ...registrationData,
        teamId: parseInt(teamId),
        role: "employee",
      });

      setSuccess("¡Registro completado! Redirigiendo...");
      setTimeout(() => navigate("/activity"), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al registrar usuario");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Crear cuenta">
      {error && (
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
            name="employeeRole"
            type="text"
            placeholder="Rol en la Empresa"
            value={formData.employeeRole}
            onChange={handleInputChange}
            icon={Briefcase}
          />
          <FormInput
            name="confirmPassword"
            type="password"
            placeholder="Confirmar Contraseña"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            icon={Lock}
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
    </AuthLayout>
  );
}
