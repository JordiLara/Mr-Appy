import { Link, useLocation } from "react-router-dom";
import { Smile, Home, BarChart2, MessageSquare, LogOut } from "lucide-react";

export default function MainNavbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/home", icon: Home, label: "Home" },
    { path: "/dashboard", icon: BarChart2, label: "Dashboard" },
    { path: "/reviews", icon: MessageSquare, label: "Reviews" },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/home" className="flex items-center gap-2">
            <Smile className="w-8 h-8 text-yellow-400" />
            <span className="font-bold text-xl">MrAppy</span>
          </Link>

          <div className="flex items-center gap-6">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors
                  ${
                    isActive(path)
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          <Link
            to="/"
            className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
