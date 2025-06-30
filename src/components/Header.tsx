import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Menu, X } from 'lucide-react';

interface HeaderProps {
  isLanding?: boolean;
}

export default function Header({ isLanding = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-blue-600 rounded-lg group-hover:bg-blue-700 transition-colors">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Instituto Ágora</span>
          </Link>

          {isLanding && (
            <>
              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-8">
                <a href="#inicio" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Início
                </a>
                <a href="#cursos" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Cursos
                </a>
                <a href="#sobre" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Sobre
                </a>
                <Link 
                  to="/login" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Entrar
                </Link>
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        {isLanding && isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <a href="#inicio" className="text-gray-700 hover:text-blue-600 transition-colors">
                Início
              </a>
              <a href="#cursos" className="text-gray-700 hover:text-blue-600 transition-colors">
                Cursos
              </a>
              <a href="#sobre" className="text-gray-700 hover:text-blue-600 transition-colors">
                Sobre
              </a>
              <Link 
                to="/login" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                Entrar
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}