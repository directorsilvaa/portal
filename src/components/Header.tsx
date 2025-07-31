import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Menu, X, ChevronDown } from "lucide-react";
import Logo from "../assets/logo.png";
interface HeaderProps {
  isLanding?: boolean;
}

export default function Header({ isLanding = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-22">
          <Link to="/" className="flex items-center space-x-3 group">
            <img src={Logo} alt="logo" className="h-24 w-full text-white" />
          </Link>

          {isLanding && (
            <>
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <a
                  href="#inicio"
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group"
                >
                  Início
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a
                  href="#cursos"
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group"
                >
                  Cursos
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a
                  href="#sobre"
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group"
                >
                  Sobre
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <Link
                  to="/login"
                  className="bg-[#003b5f] text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Entrar na Plataforma
                </Link>
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        {isLanding && isMenuOpen && (
          <div className="md:hidden py-6 border-t border-gray-100 bg-white/95 backdrop-blur-md">
            <nav className="flex flex-col space-y-4">
              <a
                href="#inicio"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2 px-4 rounded-lg hover:bg-blue-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </a>
              <a
                href="#cursos"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2 px-4 rounded-lg hover:bg-blue-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Cursos
              </a>
              <a
                href="#sobre"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2 px-4 rounded-lg hover:bg-blue-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </a>
              <Link
                to="/login"
                className="bg-[#003b5f] text-white px-6 py-3 rounded-xl transition-all duration-300 text-center font-semibold shadow-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Entrar na Plataforma
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
