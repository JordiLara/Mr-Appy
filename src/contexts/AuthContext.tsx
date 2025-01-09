import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import api from "../services/api";

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

  const fetchUser = useCallback(async () => {
    try {
      const response = await api.get("/user");
      console.log("User from auth: ", user);
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      await api.post("/auth/login", credentials);
      await fetchUser();
    } catch (error) {
      console.error("Error during login:", error);
      throw new Error("Login failed");
    }
  };

  const logout = async () => {
    try {
      await api.get("/auth/logout");
      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  console.log("User from auth: ", user);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
