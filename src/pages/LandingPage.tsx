import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CourseCard from "../components/CourseCard";
import { useData } from "../contexts/DataContext";
import {
  // Award,
  // Globe,
  Users,
  // CheckCircle,
  Star,
  ArrowRight,
  Play,
  BookOpen,
  Clock,
  Trophy,
  Zap,
  Shield,
  Target,
  TrendingUp,
  Heart,
  Sparkles,
} from "lucide-react";

export default function LandingPage() {
  const { courses } = useData();

  return (
    <div className="min-h-screen">
      <Header isLanding />

      {/* Hero Section */}
      <section
        id="inicio"
        className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white overflow-hidden min-h-screen flex items-center"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-white bg-opacity-10 backdrop-blur-sm rounded-full text-sm font-medium border border-white border-opacity-20">
                <Sparkles className="h-4 w-4 mr-2" />
                Transforme sua carreira hoje mesmo
              </div>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Educação de
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500">
                  Excelência
                </span>
                para o Futuro
              </h1>

              <p className="text-xl text-gray-200 leading-relaxed max-w-lg">
                Desenvolva suas habilidades com nossos cursos premium.
                Metodologia comprovada, suporte especializado.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/login"
                  className="group bg-gradient-to-r from-orange-500 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-orange-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-2xl hover:shadow-orange-500/25"
                >
                  <span>Acessar Plataforma</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="https://wa.me/5538999921124"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white bg-opacity-10 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-semibold hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center space-x-2 border border-white border-opacity-20"
                >
                  <span>Falar com Especialista</span>
                  <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">
                    5000+
                  </div>
                  <div className="text-sm text-gray-300">Alunos Formados</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">98%</div>
                  <div className="text-sm text-gray-300">Satisfação</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">10+</div>
                  <div className="text-sm text-gray-300">Anos</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 space-y-6 border border-white border-opacity-20 shadow-2xl">
                {/* <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Certificação Premium</h3>
                    <p className="text-gray-200">Reconhecida nacionalmente</p>
                  </div>
                </div> */}

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      Mentoria Exclusiva
                    </h3>
                    <p className="text-gray-200">Acompanhamento 1:1</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Acesso Vitalício</h3>
                    <p className="text-gray-200">Estude no seu ritmo</p>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-300">
                      Progresso médio dos alunos
                    </span>
                    <span className="text-sm font-semibold text-green-400">
                      87%
                    </span>
                  </div>
                  <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full w-[87%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              <Target className="h-4 w-4 mr-2" />
              Por que somos diferentes
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Metodologia que
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {" "}
                Funciona
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nossa abordagem única combina teoria e prática para garantir
              resultados reais
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* <div className="group text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Certificação Premium</h3>
              <p className="text-gray-600 leading-relaxed">
                Certificados com validade nacional e reconhecimento no mercado de trabalho
              </p>
            </div> */}

            <div className="group text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Flexibilidade Total
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Estude quando quiser, onde quiser, no seu próprio ritmo e
                horário
              </p>
            </div>

            <div className="group text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Suporte Humanizado
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Mentores dedicados para te acompanhar em cada etapa da jornada
              </p>
            </div>

            <div className="group text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Resultados Comprovados
              </h3>
              <p className="text-gray-600 leading-relaxed">
                98% dos nossos alunos conseguem melhores oportunidades
                profissionais
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="cursos" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4">
              <BookOpen className="h-4 w-4 mr-2" />
              Nossos cursos
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Cursos que
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                {" "}
                Transformam
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Desenvolvidos por especialistas do mercado para impulsionar sua
              carreira ao próximo nível
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Números que Impressionam
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Resultados reais de uma década transformando vidas através da
              educação
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2 text-green-400">
                50+
              </div>
              <div className="text-blue-100 text-lg">Cursos Especializados</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2 text-pink-400">
                98%
              </div>
              <div className="text-blue-100 text-lg">Taxa de Satisfação</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2 text-orange-400">
                10+
              </div>
              <div className="text-blue-100 text-lg">Anos de Excelência</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-900/50 to-blue-900/50"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white bg-opacity-10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white border-opacity-20">
            <Sparkles className="h-4 w-4 mr-2" />
            Comece sua transformação hoje
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Sua Nova Carreira
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              Começa Aqui
            </span>
          </h2>

          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Junte-se a milhares de profissionais que já transformaram suas
            carreiras com nossos cursos premium
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/login"
              className="group bg-gradient-to-r from-blue-600 to-purple-700 text-white px-10 py-5 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 shadow-2xl hover:shadow-blue-500/25"
            >
              <BookOpen className="h-6 w-6" />
              <span className="text-lg">Acessar Plataforma</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="https://wa.me/5538999921124"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-r from-green-600 to-emerald-700 text-white px-10 py-5 rounded-2xl font-semibold hover:from-green-700 hover:to-emerald-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 shadow-2xl hover:shadow-green-500/25"
            >
              <Star className="h-6 w-6" />
              <span className="text-lg">Falar com Especialista</span>
            </a>
          </div>

          <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Garantia de 30 dias</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span>Suporte vitalício</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
