import React from "react";
import { Link } from "react-router-dom";
import { Smile, Home } from "lucide-react";

type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export default function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700">
      {/* Auth Navbar */}
      <nav className="absolute top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center gap-2">
              <Smile className="w-8 h-8 text-yellow-400" />
              <span className="text-2xl font-bold text-white">MrAppy</span>
            </Link>
            <Link
              to="/"
              className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Volver al inicio</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="min-h-screen flex flex-col justify-center items-center px-4 py-16">
        <div className="max-w-2xl w-full bg-white/10 backdrop-blur-lg p-8 md:p-10 rounded-2xl shadow-xl">
          <div className="flex justify-center mb-8">
            <Smile className="w-12 h-12 text-yellow-400" />
            <h1 className="text-3xl font-bold text-white ml-3">MrAppy</h1>
          </div>
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            {title}
          </h2>
          {children}
        </div>
      </div>
    </div>
  );
}
