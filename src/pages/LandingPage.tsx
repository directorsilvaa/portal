import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CourseCard from '../components/CourseCard';
import { useData } from '../contexts/DataContext';
import { 
  Award, 
  Globe, 
  Users, 
  CheckCircle, 
  Star,
  ArrowRight,
  Play,
  BookOpen,
  Clock,
  Trophy
} from 'lucide-react';

export default function LandingPage() {
  const { courses } = useData();

  return (
    <div className="min-h-screen">
      <Header isLanding />
      
      {/* Hero Section */}
      <section id="inicio" className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Educação de
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  Qualidade
                </span>
                para Todos
              </h1>
              
              <p className="text-xl text-blue-100 leading-relaxed">
                Transforme sua carreira com nossos cursos online. 
                Aprenda com especialistas, obtenha certificação e construa seu futuro.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/login" 
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-xl"
                >
                  <span>Entrar no Portal</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                
                <a 
                  href="https://wa.me/5511999999999" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white bg-opacity-10 backdrop-blur text-white px-8 py-4 rounded-xl font-semibold hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center space-x-2 border border-white border-opacity-20"
                >
                  <span>Quero me Matricular</span>
                  <Play className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white bg-opacity-10 backdrop-blur rounded-2xl p-8 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-500 rounded-full">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Certificação Reconhecida</h3>
                    <p className="text-blue-100">Certificados válidos em todo Brasil</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-purple-500 rounded-full">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Suporte Personalizado</h3>
                    <p className="text-blue-100">Acompanhamento individual</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-yellow-500 rounded-full">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Acesso Online 24/7</h3>
                    <p className="text-blue-100">Estude quando e onde quiser</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-yellow-400 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-orange-500 rounded-full opacity-10 animate-pulse delay-1000"></div>
      </section>

      {/* Courses Section */}
      <section id="cursos" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nossos Cursos
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Desenvolvidos por especialistas do mercado para impulsionar sua carreira
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="sobre" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que Escolher o Instituto Ágora?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Mais de 10 anos transformando vidas através da educação
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-300 transform group-hover:scale-110">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Certificação</h3>
              <p className="text-gray-600">
                Certificados reconhecidos pelo mercado e válidos em todo território nacional
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-green-500 to-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:from-green-600 group-hover:to-green-700 transition-all duration-300 transform group-hover:scale-110">
                <Clock className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Flexibilidade</h3>
              <p className="text-gray-600">
                Estude no seu ritmo, quando e onde quiser, com acesso 24 horas por dia
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:from-purple-600 group-hover:to-purple-700 transition-all duration-300 transform group-hover:scale-110">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Suporte</h3>
              <p className="text-gray-600">
                Acompanhamento personalizado com tutores especialistas em cada área
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:from-orange-600 group-hover:to-orange-700 transition-all duration-300 transform group-hover:scale-110">
                <Trophy className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Qualidade</h3>
              <p className="text-gray-600">
                Conteúdo desenvolvido por profissionais com experiência de mercado
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">5000+</div>
              <div className="text-blue-100">Alunos Formados</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Cursos Disponíveis</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Satisfação</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10+</div>
              <div className="text-blue-100">Anos de Experiência</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para Transformar sua Carreira?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Junte-se a milhares de alunos que já conquistaram seus objetivos conosco
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/login" 
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-xl"
            >
              <BookOpen className="h-5 w-5" />
              <span>Acessar Portal do Aluno</span>
            </Link>
            
            <a 
              href="https://wa.me/5511999999999" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-xl"
            >
              <Star className="h-5 w-5" />
              <span>Fale Conosco</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}