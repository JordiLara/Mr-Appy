import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-700 min-h-screen flex items-center relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              La herramienta más sencilla para mantener a tu equipo feliz y
              motivado.
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              30 segundos al día por miembro del equipo proporcionan datos e
              información valiosa para líderes y gerentes.
            </p>
            <Link
              to="/register"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Comienza como Líder de Equipo →
            </Link>
          </div>
          <div className="hidden lg:block">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-700/20 rounded-2xl backdrop-blur-sm z-10"></div>
              <div className="absolute -inset-4 bg-white/10 rounded-2xl transform rotate-2"></div>
              <div className="absolute -inset-4 bg-white/10 rounded-2xl transform -rotate-2"></div>

              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl z-20">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="Team collaboration"
                  className="w-full h-[450px]  object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-1/2 right-0 w-1/3 h-1/3 bg-yellow-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-1/4 h-1/4 bg-blue-400/10 rounded-full blur-3xl"></div>
    </div>
  );
};
export default Hero;
