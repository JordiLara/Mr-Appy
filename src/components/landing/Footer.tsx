import { Smile } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Smile className="w-8 h-8 text-yellow-400" />
              <span className="text-2xl font-bold text-white">MrAppy</span>
            </div>
            <p className="text-gray-400 max-w-md">
              La herramienta más sencilla para mantener a tu equipo feliz y
              motivado. Rastrea la moral, recopila información y construye una
              mejor cultura laboral.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Ayuda</h3>
            <ul className="space-y-2">
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Preguntas frecuentes
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-white transition-colors"
                >
                  Contáctanos
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Compañía</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Sobre nosotros
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  className="hover:text-white transition-colors"
                >
                  Política de privacidad
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-white transition-colors">
                  Términos de servicio
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} MrAppy. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
