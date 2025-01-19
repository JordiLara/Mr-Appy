import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Calendar,
  BarChart2,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Smile,
  Settings,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const navItems = [
    { path: "/activity", icon: Home, label: "Actividad" },
    { path: "/calendar", icon: Calendar, label: "Calendario" },
    { path: "/stats", icon: BarChart2, label: "Estadísticas" },
    { path: "/team", icon: Users, label: "Equipo" },
  ];

  return (
    <aside
      className={`bg-blue-600 text-white transition-all duration-300 relative
        ${isCollapsed ? "w-20" : "w-64"}`}
    >
      {/* Toggle button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-blue-600 rounded-full p-1 shadow-lg"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-white" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-white" />
        )}
      </button>

      {/* Logo and User Info */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-2">
          <Smile className="w-8 h-8 text-yellow-400 flex-shrink-0" />
          {!isCollapsed && <span className="text-xl font-bold">MrAppy</span>}
        </div>
        {!isCollapsed && user && (
          <p className="text-sm text-blue-100">Bienvenido, {user.name}</p>
        )}
      </div>

      {/* Navigation */}
      <nav className="mt-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-6 py-4 transition-colors
              ${
                location.pathname === item.path
                  ? "bg-blue-700 border-l-4 border-yellow-400"
                  : "hover:bg-blue-500"
              }`}
          >
            <item.icon className="w-6 h-6 flex-shrink-0" />
            {!isCollapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Settings and Logout */}
      <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
        <Link
          to="/settings"
          className="flex items-center gap-3 text-blue-200 hover:text-white transition-colors"
        >
          <Settings className="w-6 h-6 flex-shrink-0" />
          {!isCollapsed && <span>Ajustes</span>}
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-blue-200 hover:text-white transition-colors w-full"
        >
          <LogOut className="w-6 h-6 flex-shrink-0" />
          {!isCollapsed && <span>Cerrar sesión</span>}
        </button>
      </div>
    </aside>
  );
}
