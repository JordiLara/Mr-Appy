import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import AuthLayout from "../auth/AuthLayout";
import FormInput from "../components/FormInput";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const user = await login(formData);

      // Obtener la ruta anterior o usar la ruta por defecto según el rol
      const from =
        location.state?.from?.pathname ||
        (user.roles === "manager" ? "/manager/managerdashboard" : "/activity");
console.log(user)
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Bienvenido de nuevo">
      {error && (
        <div className="bg-red-500/10 text-red-100 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
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

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-lg 
            transition-colors disabled:opacity-50 mt-8"
        >
          {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-white">
        ¿No tienes una cuenta?{" "}
        <Link
          to="/register"
          className="text-yellow-400 hover:text-yellow-300 font-medium"
        >
          Regístrate aquí
        </Link>
      </p>
    </AuthLayout>
  );
}
