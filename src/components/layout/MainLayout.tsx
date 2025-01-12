import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Sidebar from "./Sidebar";

export default function MainLayout() {
  const { user } = useAuth();

  // Redirigir a dashboard si es un manager
  if (user?.roles === "manager") {
    return <Navigate to="/manager/dashboard" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
