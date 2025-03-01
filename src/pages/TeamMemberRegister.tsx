import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Mail, Lock, User, Briefcase } from "lucide-react";
import AuthLayout from "../auth/AuthLayout";
import FormInput from "../components/FormInput";
import { authService, teamService } from "../services/api";

interface TeamMemberFormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  surname: string;
  employeeRole: string;
}

interface TeamInfo {
  team_name: string;
  company_name: string;
}

export default function TeamMemberRegister() {
  const navigate = useNavigate();
  const { id_team } = useParams();
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
  const [teamInfo, setTeamInfo] = useState<TeamInfo | null>(null);

  useEffect(() => {
    const fetchTeamInfo = async () => {
      try {
        if (!id_team) {
          setError("ID de equipo no proporcionado");
          return;
        }
        const team = await teamService.getTeam(id_team);
        setTeamInfo({
          team_name: team.team_name,
          company_name: team.company_name,
        });
      } catch (err) {
        setError("Equipo no encontrado o enlace inválido");
      }
    };

    fetchTeamInfo();
  }, [id_team]);

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
      if (!id_team) {
        throw new Error("ID de equipo no proporcionado");
      }

      const { confirmPassword, ...registrationData } = formData;

      await authService.register({
        ...registrationData,
        id_team: id_team,
        roles: "user",
      });

      setSuccess("¡Registro completado! Redirigiendo...");
      setTimeout(() => navigate("/activity"), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al registrar usuario");
    } finally {
      setIsLoading(false);
    }
  };

  if (!teamInfo && !error) {
    return (
      <AuthLayout title="Cargando información del equipo...">
        <div className="text-center text-white">
          Por favor espera mientras cargamos la información...
        </div>
      </AuthLayout>
    );
  }

  if (error && !teamInfo) {
    return (
      <AuthLayout title="Error">
        <div className="bg-red-500/10 text-red-100 p-4 rounded-lg">{error}</div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title={`Únete a ${teamInfo?.team_name}`}>
      <div className="mb-6 text-center">
        <p className="text-blue-100">
          Te estás uniendo al equipo de {teamInfo?.team_name} en{" "}
          {teamInfo?.company_name}
        </p>
      </div>

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
          {isLoading ? "Registrando..." : "Unirme al equipo"}
        </button>
      </form>
    </AuthLayout>
  );
}
