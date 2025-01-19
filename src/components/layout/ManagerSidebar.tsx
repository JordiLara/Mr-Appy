import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  UserPlus,
  Settings,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export default function ManagerSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const navItems = [
    {
      path: "/manager/managerdashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
    },
    { path: "/manager/teaminvites", icon: UserPlus, label: "Invitar Equipo" },
    { path: "/manager/managerteam", icon: Users, label: "Equipo" },
    { path: "/manager/reviews", icon: MessageSquare, label: "Reviews" },
  ];

  return (
    <aside
      className={`bg-indigo-600 text-white transition-all duration-300 relative
        ${isCollapsed ? "w-20" : "w-64"}`}
    >
      {/* Toggle button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-indigo-600 rounded-full p-1 shadow-lg"
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
          <Briefcase className="w-8 h-8 text-yellow-400 flex-shrink-0" />
          {!isCollapsed && <span className="text-xl font-bold">Manager</span>}
        </div>
        {!isCollapsed && user && (
          <p className="text-sm text-indigo-100">Bienvenido, {user.name}</p>
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
                  ? "bg-indigo-700 border-l-4 border-yellow-400"
                  : "hover:bg-indigo-500"
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
          className="flex items-center gap-3 text-indigo-200 hover:text-white transition-colors"
        >
          <Settings className="w-6 h-6 flex-shrink-0" />
          {!isCollapsed && <span>Ajustes</span>}
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-indigo-200 hover:text-white transition-colors w-full"
        >
          <LogOut className="w-6 h-6 flex-shrink-0" />
          {!isCollapsed && <span>Cerrar sesión</span>}
        </button>
      </div>
    </aside>
  );
}
