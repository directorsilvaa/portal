import React, { useState, useEffect } from "react";
import {
  Code,
  Megaphone,
  Palette,
  BookOpen,
  ArrowRight,
  Clock,
  Users,
  Star,
  X,
  Play,
  Award,
  CheckCircle,
  Calendar,
  Trophy,
  Shield,
  Download,
  Book,
} from "lucide-react";
import { Link } from "react-router-dom";

// Simulando o tipo Course
interface Course {
  id: string;
  name: string;
  description: string;
  icon: string;
  image?: string;
}

interface CourseCardProps {
  course: Course;
}

const iconMap = {
  Code,
  Megaphone,
  Palette,
  BookOpen,
};

// Modal Component
function CourseModal({
  course,
  isOpen,
  onClose,
}: {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
}) {
  const IconComponent =
    iconMap[course.icon as keyof typeof iconMap] || BookOpen;

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close modal with Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Enhanced backdrop with animation */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? "bg-opacity-60" : "bg-opacity-0"
        } backdrop-blur-sm`}
        onClick={onClose}
      />

      {/* Modal with improved animations */}
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div
          className={`relative bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden transform transition-all duration-300 ${
            isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          {/* Enhanced close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-3 bg-white bg-opacity-95 backdrop-blur-sm rounded-full hover:bg-opacity-100 transition-all shadow-lg hover:shadow-xl group"
            aria-label="Fechar modal"
          >
            <X className="h-5 w-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
          </button>

          {/* Scrollable content */}
          <div className="overflow-y-auto max-h-[95vh] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {/* Hero Section - Enhanced */}
            <div className="relative h-72 sm:h-80 lg:h-96 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 overflow-hidden">
              {course.image ? (
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full relative">
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-20 h-20 border border-white rounded-full animate-pulse"></div>
                    <div className="absolute top-20 right-20 w-16 h-16 border border-white rounded-full animate-pulse delay-1000"></div>
                    <div className="absolute bottom-20 left-20 w-24 h-24 border border-white rounded-full animate-pulse delay-500"></div>
                  </div>

                  <div className="relative p-8 bg-white bg-opacity-20 backdrop-blur-sm rounded-3xl border border-white border-opacity-30">
                    <IconComponent className="h-20 w-20 sm:h-24 sm:w-24 text-white drop-shadow-lg" />
                  </div>
                </div>
              )}

              {/* Enhanced gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>

              {/* Course info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="max-w-4xl">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 drop-shadow-lg">
                    {course.name}
                  </h2>
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-white text-opacity-90">
                    {/* <div className="flex items-center space-x-2 bg-white bg-opacity-20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-semibold text-sm">4.9</span>
                      <span className="text-sm opacity-75">
                        (1.2k avaliações)
                      </span>
                    </div> */}
                    {/* <div className="flex items-center space-x-2 bg-white bg-opacity-20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">3.5k+ alunos</span>
                    </div> */}
                    <div className="flex items-center space-x-2 bg-white bg-opacity-20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">40h de conteúdo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="p-6 sm:p-8 lg:p-12">
              <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                {/* Content Column */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Description */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Sobre este curso
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {course.description} Este curso foi desenvolvido para
                      levar você do iniciante ao avançado, com uma metodologia
                      prática e projetos reais que você pode usar em seu
                      portfólio.
                    </p>
                  </div>

                  {/* Learning outcomes */}
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-6">
                      O que você vai aprender
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        "Fundamentos essenciais e conceitos avançados",
                        // "Projetos práticos para seu portfólio",
                        // "Melhores práticas da indústria",
                        // "Ferramentas profissionais mais utilizadas",
                        // "Técnicas de otimização e performance",
                        // "Certificação reconhecida pelo mercado",
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <p className="text-gray-700 text-sm">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Course features */}
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-6">
                      Recursos inclusos
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        {
                          icon: Play,
                          text: "Vídeos em HD.",
                          color: "text-blue-600",
                        },
                        {
                          icon: Book,
                          text: "Materiais para disponíveis para leitura.",
                          color: "text-purple-600",
                        },
                        // {
                        //   icon: Trophy,
                        //   text: "Certificado de conclusão",
                        //   color: "text-yellow-600",
                        // },
                        {
                          icon: Shield,
                          text: "Acesso vitalício",
                          color: "text-green-600",
                        },
                      ].map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl"
                        >
                          <feature.icon
                            className={`h-6 w-6 ${feature.color}`}
                          />
                          <span className="text-gray-700 font-medium">
                            {feature.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      {
                        icon: Clock,
                        value: "40h",
                        label: "Duração total",
                        color: "bg-blue-50 text-blue-600",
                      },
                      {
                        icon: Play,
                        value: "10+",
                        label: "Vídeo aulas",
                        color: "bg-purple-50 text-purple-600",
                      },
                      // {
                      //   icon: Users,
                      //   value: "3.5k+",
                      //   label: "Estudantes",
                      //   color: "bg-green-50 text-green-600",
                      // },
                      {
                        icon: Award,
                        value: "100%",
                        label: "Online",
                        color: "bg-yellow-50 text-yellow-600",
                      },
                    ].map((stat, index) => (
                      <div
                        key={index}
                        className="text-center p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div
                          className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${stat.color}`}
                        >
                          <stat.icon className="h-6 w-6" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900 mb-1">
                          {stat.value}
                        </p>
                        <p className="text-xs text-gray-600 font-medium">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enhanced Sidebar */}
                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 border border-gray-100 shadow-lg sticky top-8">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-[#003b5f] rounded-2xl mb-4">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <h5 className="text-lg font-semibold text-gray-900 mb-2">
                        Transforme sua carreira
                      </h5>
                      <p className="text-sm text-gray-600">
                        Acesso completo e vitalício a todo conteúdo
                      </p>
                    </div>

                    <Link
                      to={`/register?courseId=${course._id}`}
                      className="w-full bg-[#003b5f] text-white py-4 px-6 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl mb-6 group flex items-center justify-center space-x-2 no-underline"
                    >
                      <span>Inscrever-se Agora</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <div className="space-y-3">
                      {[
                        { icon: Shield, text: "Acesso vitalício garantido" },
                        // { icon: Trophy, text: "Certificado reconhecido" },
                        // { icon: Users, text: "Comunidade exclusiva" },
                        // { icon: Calendar, text: "Suporte por 1 ano" },
                      ].map((benefit, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 text-sm"
                        >
                          <benefit.icon className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{benefit.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CourseCard({ course }: CourseCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const IconComponent =
    iconMap[course.icon as keyof typeof iconMap] || BookOpen;

  const handleSaibaMaisClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  // Truncate description to maintain consistent card height
  const truncateDescription = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength).trim() + "...";
  };

  return (
    <>
      <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 h-full flex flex-col">
        {/* Course Image/Icon - Fixed height */}
        <div className="relative h-48 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 overflow-hidden flex-shrink-0">
          {course.image ? (
            <img
              src={course.image}
              alt={course.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="flex items-center justify-center h-full relative">
              {/* Subtle background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 w-8 h-8 border border-white rounded-full animate-pulse"></div>
                <div className="absolute top-8 right-8 w-6 h-6 border border-white rounded-full animate-pulse delay-700"></div>
                <div className="absolute bottom-6 left-8 w-10 h-10 border border-white rounded-full animate-pulse delay-300"></div>
              </div>

              <div className="relative p-6 bg-white bg-opacity-20 backdrop-blur-sm rounded-3xl group-hover:scale-110 transition-transform duration-500 border border-white border-opacity-20">
                <IconComponent className="h-16 w-16 text-white drop-shadow-lg" />
              </div>
            </div>
          )}

          {/* Enhanced overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Premium badge */}
          <div className="absolute top-4 right-4 bg-white bg-opacity-95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-gray-800 flex items-center space-x-1 shadow-sm">
            <Star className="h-3 w-3 text-yellow-500 fill-current" />
            <span>Premium</span>
          </div>
        </div>

        {/* Card content - Flexible height */}
        <div className="p-6 sm:p-8 flex flex-col flex-1">
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
              {course.name}
            </h3>

            <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">
              {truncateDescription(course.description)}
            </p>
          </div>

          {/* Course stats - Fixed position */}
          <div className="flex items-center justify-between mb-6 text-sm text-gray-500 border-t border-gray-100 pt-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span className="font-medium">40h conteúdo</span>
            </div>
            {/* <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-purple-500" />
              <span className="font-medium">3.5k+ alunos</span>
            </div> */}
          </div>

          {/* CTA Button - Fixed at bottom */}
          <button
            onClick={handleSaibaMaisClick}
            className="w-full bg-gradient-to-r from-[#003b5f] to-[#004a73] text-white py-4 px-6 rounded-2xl font-semibold hover:from-[#004a73] hover:to-[#005a8a] transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <span>Saiba Mais</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Enhanced Modal */}
      <CourseModal
        course={course}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
