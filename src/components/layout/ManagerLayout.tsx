import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import ManagerSidebar from "./ManagerSidebar";

export default function ManagerLayout() {
  const { user } = useAuth();

  // Redirigir a activity si es un empleado
  if (user?.roles === "user") {
    return <Navigate to="/activity" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <ManagerSidebar />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
