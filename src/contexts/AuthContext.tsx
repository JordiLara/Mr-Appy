import React, { createContext, useState, useEffect, ReactNode } from "react";
import api from "../utils/api";

interface AuthContextType {
  user: any;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);

  // Función para cargar el perfil del usuario
  const fetchUser = async () => {
    try {
      const response = await api.get("/user"); 
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null); // Maneja el error limpiando el estado del usuario
    }
  };

  // Ejecutar fetchUser al montar la app
  useEffect(() => {
    fetchUser();
  }, []);

  // Función para hacer login
  const login = async (credentials: { email: string; password: string }) => {
    try {
      await api.post("/auth/login", credentials); // Login en el backend
      await fetchUser(); // Cargar el perfil del usuario tras el login
    } catch (error) {
      console.error("Error during login:", error);
      throw new Error("Login failed");
    }
  };

  // Función para hacer logout
  const logout = async () => {
    try {
      await api.get("/auth/logout"); // Logout en el backend
      setUser(null); // Limpiar el estado del usuario
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
