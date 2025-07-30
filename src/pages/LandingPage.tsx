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
  Award,
} from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function LandingPage() {
  // const { courses } = useData();

  const [classes, setLessons] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar dados das lições
  const fetchDataLesson = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://portal-backend-kvw9.onrender.com/api/lessons/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLessons(response.data?.lessons); // Armazena os dados das lições
    } catch (error) {
      console.error("Erro ao buscar lições:", error);
    }
  };

  // Função para buscar dados dos cursos
  const fetchDataCourse = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://portal-backend-kvw9.onrender.com/api/courses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCourses(response.data?.courses); // Armazena os dados dos cursos
    } catch (error) {
      console.error("Erro ao buscar cursos:", error);
    }
  };

  // useEffect para chamar as funções de busca de dados
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Inicia o carregamento
      await Promise.all([fetchDataLesson(), fetchDataCourse()]);
      setLoading(false); // Finaliza o carregamento
    };

    fetchData();
  }, []); // Executa apenas uma vez quando o componente é montado
  return (
    <div className="min-h-screen">
      <Header isLanding />

      {/* Hero Section */}
      <section
        id="inicio"
        className="relative bg-[#c1aa78] overflow-hidden h-12 flex items-center"
      >
        {/* <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-white bg-opacity-10 backdrop-blur-sm rounded-full text-sm font-medium border border-white border-opacity-20">
                <Sparkles className="h-4 w-4 mr-2" />
                Transforme sua carreira hoje mesmo
              </div>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Educação de
                <span className="block text-[#003b5f]">
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
                  className="group bg-[#003b5f] text-white px-8 py-4 rounded-2xl font-semibold hover:from-orange-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-2xl hover:shadow-orange-500/25"
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
            </div>

            <div className="relative">
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 space-y-6 border border-white border-opacity-20 shadow-2xl">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-[#003b5f] rounded-2xl">
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
                  <div className="p-3 bg-[#003b5f] rounded-2xl">
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
                    <span className="text-sm font-semibold text-[#003b5f]">
                      87%
                    </span>
                  </div>
                  <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                    <div className="bg-[#003b5f] h-2 rounded-full w-[87%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </section>

      {/* Courses Section */}
      <section id="cursos" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-[#c1aa78] rounded-full text-sm font-medium mb-4">
              <BookOpen className="h-4 w-4 mr-2" />
              Nossos cursos
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Cursos que
              <span className="text-[#003b5f]"> Transformam</span>
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

      <Footer />
    </div>
  );
}
