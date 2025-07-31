import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";
import Header from "../components/Header";
import {
  LogOut,
  BookOpen,
  Bell,
  AlertTriangle,
  Play,
  Clock,
  CheckCircle,
  User,
  Video,
  FileText,
  Eye,
  X,
  ArrowLeft,
  Star,
  Award,
  Users,
  Calendar,
  Sparkles,
  TrendingUp,
  Phone,
  StarsIcon,
  Save,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const { announcements } = useData();
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [currentView, setCurrentView] = useState<"courses" | "classes">(
    "courses"
  );

  const [classes, setLessons] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [evaluations, setEvaluations] = useState([]);
  // Dados de exemplo - em um app real, isso viria de uma API filtrada pelo ID do aluno
  const [studentEvaluations, setStudentEvaluations] = useState([
    // {
    //   id: 1,
    //   studentId: user?.id, // ID do aluno logado
    //   studentName: user?.name,
    //   evaluationDate: "2024-01-15",
    //   responseDate: "2024-01-20",
    //   grade: 8.5,
    //   questions: [
    //     {
    //       question: "Como você se sente durante as aulas de pilates?",
    //       answer: "Me sinto muito bem e motivado, as aulas são dinâmicas",
    //       type: "text",
    //     },
    //     {
    //       question: "Você está satisfeito com seu progresso até agora?",
    //       answer: "sim",
    //       type: "yesno",
    //     },
    //     {
    //       question:
    //         "Tem alguma dificuldade específica que gostaria de trabalhar?",
    //       answer: "Gostaria de melhorar meu equilíbrio e flexibilidade",
    //       type: "text",
    //     },
    //     {
    //       question: "Recomendaria nosso estúdio para amigos?",
    //       answer: "sim",
    //       type: "yesno",
    //     },
    //   ],
    // },
    // {
    //   id: 3,
    //   studentId: user?.id,
    //   studentName: user?.name,
    //   evaluationDate: "2024-01-25",
    //   responseDate: null,
    //   grade: null,
    //   questions: [
    //     {
    //       question: "Como foi sua adaptação às aulas online?",
    //       answer: "",
    //       type: "text",
    //     },
    //     {
    //       question: "Você consegue acompanhar os exercícios em casa?",
    //       answer: "",
    //       type: "yesno",
    //     },
    //     {
    //       question: "Que tipo de exercício você mais gosta?",
    //       answer: "",
    //       type: "text",
    //     },
    //     {
    //       question: "Precisa de equipamentos adicionais?",
    //       answer: "",
    //       type: "yesno",
    //     },
    //   ],
    // },
    // {
    //   id: 5,
    //   studentId: user?.id,
    //   studentName: user?.name,
    //   evaluationDate: "2024-02-01",
    //   responseDate: "2024-02-03",
    //   grade: 9.2,
    //   questions: [
    //     {
    //       question: "Qual sua avaliação geral do nosso atendimento?",
    //       answer: "Excelente! Sempre muito atenciosos e profissionais",
    //       type: "text",
    //     },
    //     {
    //       question: "As aulas atendem suas expectativas?",
    //       answer: "sim",
    //       type: "yesno",
    //     },
    //     {
    //       question: "Você notou melhorias na sua condição física?",
    //       answer: "sim",
    //       type: "yesno",
    //     },
    //   ],
    // },
    // {
    //   id: 7,
    //   studentId: user?.id,
    //   studentName: user?.name,
    //   evaluationDate: "2024-02-10",
    //   responseDate: null,
    //   grade: null,
    //   questions: [
    //     {
    //       question: "Como você avalia a qualidade dos equipamentos?",
    //       answer: "",
    //       type: "text",
    //     },
    //     {
    //       question: "O horário das aulas é conveniente para você?",
    //       answer: "",
    //       type: "yesno",
    //     },
    //   ],
    // },
  ]);

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

  // Função para buscar dados dos estudantes
  const fetchAvaliacoes = async () => {
    try {
      const token = localStorage.getItem("token"); // Recupera o token do local storage
      const response = await axios.get(
        `https://portal-backend-kvw9.onrender.com/api/avaliacoes/aluno/${user?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStudentEvaluations(response.data?.data || []); // Armazena os dados dos estudantes
    } catch (error) {
      console.error("Erro ao buscar estudantes:", error);
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
      await Promise.all([
        fetchDataLesson(),
        fetchDataCourse(),
        fetchAvaliacoes(),
      ]);
      setLoading(false); // Finaliza o carregamento
    };

    fetchData();
  }, []); // Executa apenas uma vez quando o componente é montado

  // Filter classes based on user's course access
  const userClasses = classes.filter((cls) => {
    const course = courses.find((c) => c._id === cls.course?._id);
    return (
      course &&
      user?.canAccessClasses &&
      user?.courseAccess?.includes(cls.course?._id)
    );
  });

  // Get courses the user has access to
  const userCourses = courses.filter((course) =>
    user?.courseAccess?.includes(course._id)
  );

  const handleCourseClick = (course: any) => {
    setSelectedCourse(course);
    setCurrentView("classes");
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
    setCurrentView("courses");
  };

  const handleWatchClass = (cls: any) => {
    setSelectedClass(cls);
  };

  const closeClassViewer = () => {
    setSelectedClass(null);
  };

  // Estados necessários (adicionar no componente do aluno)
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [evaluationResponses, setEvaluationResponses] = useState({});
  const [showAllEvaluations, setShowAllEvaluations] = useState(false);

  // Função para visualizar uma avaliação
  const handleViewEvaluation = (evaluation) => {
    setSelectedEvaluation(evaluation);
    setShowEvaluationModal(true);

    // Inicializar respostas com valores existentes se já foi respondida
    const initialResponses = {};
    evaluation.questions.forEach((question, index) => {
      if (question.answer) {
        initialResponses[index] = question.answer;
      }
    });
    setEvaluationResponses(initialResponses);
  };

  // Função para atualizar resposta de uma pergunta
  const handleResponseChange = (questionIndex, value) => {
    setEvaluationResponses({
      ...evaluationResponses,
      [questionIndex]: value,
    });
  };

  // Função para enviar respostas da avaliação
  const handleEvaluationResponse = async (e) => {
    e.preventDefault();

    // Verificar se todas as perguntas foram respondidas
    const unansweredQuestions = selectedEvaluation.questions.some(
      (question, index) =>
        !evaluationResponses[index] || evaluationResponses[index].trim() === ""
    );

    if (unansweredQuestions) {
      alert("Por favor, responda todas as perguntas antes de enviar.");
      return;
    }

    // Atualizar a avaliação com as respostas
    const updatedEvaluation = {
      ...selectedEvaluation,
      responseDate: new Date().toISOString().split("T")[0], // Data atual
      questions: selectedEvaluation.questions.map((question, index) => ({
        ...question,
        answer: evaluationResponses[index],
      })),
    };

    // console.log(updatedEvaluation);
    // return;

    try {
      const response = await axios.post(
        `https://portal-backend-kvw9.onrender.com/api/avaliacoes/${selectedEvaluation?._id}/responder`,
        updatedEvaluation,
        {
          headers: {
            // Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
          },
        }
      );

      if (response?.data) {
        // Fechar modal
        toast.success("Respostas enviadas com sucesso!");

        setShowEvaluationModal(false);
        setSelectedEvaluation(null);
        setEvaluationResponses({});
        await fetchAvaliacoes();
      }
    } catch (error) {
      console.log(error);
      
      toast.error("Erro ao responder avaliação")
    }
    // // Atualizar no estado
    // setStudentEvaluations(
    //   studentEvaluations.map((evaluation) =>
    //     evaluation.id === selectedEvaluation.id ? updatedEvaluation : evaluation
    //   )
    // );
  };

  // // Função para filtrar avaliações (mostrar apenas as 3 mais recentes na sidebar)
  // const getRecentEvaluations = () => {
  //   return studentEvaluations
  //     .sort((a, b) => new Date(b.evaluationDate) - new Date(a.evaluationDate))
  //     .slice(0, 3);
  // };

  // Get classes for selected course
  const courseClasses = selectedCourse
    ? classes.filter(
        (cls) =>
          cls.course?._id === selectedCourse._id &&
          user?.courseAccess?.includes(cls.course?._id)
      )
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-sm font-medium mb-4 border border-white border-opacity-20">
                <Sparkles className="h-4 w-4 mr-2" />
                Portal do Aluno
              </div>
              <h1 className="text-4xl font-bold mb-2">Olá, {user?.name}! 👋</h1>
              <p className="text-purple-100 text-lg">
                Continue sua jornada de aprendizado
              </p>
              <a
                href="https://wa.me/5538999921124"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white mt-2 bg-opacity-10 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-semibold hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center space-x-2 border border-white border-opacity-20"
              >
                <span>Falar com Especialista</span>
                <Phone className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 border border-white border-opacity-20">
                <User className="h-8 w-8" />
              </div>
              <button
                onClick={logout}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 px-6 py-3 rounded-2xl transition-all duration-200 flex items-center space-x-2 font-medium border border-white border-opacity-20"
              >
                <LogOut className="h-5 w-5" />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Access Status */}
            <div
              className={`p-6 rounded-2xl shadow-lg ${
                user?.canAccessClasses
                  ? "bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200"
                  : "bg-gradient-to-r from-red-50 to-pink-50 border border-red-200"
              }`}
            >
              <div className="flex items-center space-x-4">
                {user?.canAccessClasses ? (
                  <div className="p-3 bg-green-100 rounded-2xl">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                ) : (
                  <div className="p-3 bg-red-100 rounded-2xl">
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  </div>
                )}
                <div>
                  <h3
                    className={`text-xl font-bold ${
                      user?.canAccessClasses ? "text-green-800" : "text-red-800"
                    }`}
                  >
                    {user?.canAccessClasses
                      ? "Acesso Liberado ✅"
                      : "Acesso Restrito ❌"}
                  </h3>
                  <p
                    className={`${
                      user?.canAccessClasses ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {user?.canAccessClasses
                      ? `Você tem acesso a ${userCourses.length} curso(s) premium`
                      : "Entre em contato com o suporte para liberar seu acesso"}
                  </p>
                </div>
              </div>
            </div>

            {/* Courses or Classes View */}
            {user?.canAccessClasses && userCourses.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                {currentView === "courses" ? (
                  <>
                    <div className="flex items-center space-x-3 mb-8">
                      <BookOpen className="h-8 w-8 text-blue-600" />
                      <h2 className="text-3xl font-bold text-gray-900">
                        Meus Cursos
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {userCourses.map((course) => {
                        const courseClasses = classes.filter(
                          (c) => c.courseId === course.id
                        );
                        return (
                          <div
                            key={course.id}
                            onClick={() => handleCourseClick(course)}
                            className="group bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                          >
                            {/* Course Image/Icon */}
                            <div className="relative h-32 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-2xl mb-6 overflow-hidden">
                              {course.image ? (
                                <img
                                  src={course.image}
                                  alt={course.name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                              ) : (
                                <div className="flex items-center justify-center h-full">
                                  <div className="p-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl group-hover:scale-110 transition-transform duration-500">
                                    <BookOpen className="h-12 w-12 text-white" />
                                  </div>
                                </div>
                              )}

                              {/* Badge */}
                              <div className="absolute top-3 right-3 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-800 flex items-center space-x-1">
                                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                <span>Premium</span>
                              </div>
                            </div>

                            <h3 className="font-bold text-gray-900 text-xl mb-3 group-hover:text-blue-600 transition-colors">
                              {course.name}
                            </h3>

                            <p className="text-gray-600 mb-6 leading-relaxed">
                              {course.description}
                            </p>

                            {/* Course Stats */}
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                              <div className="flex items-center space-x-1">
                                <Video className="h-4 w-4" />
                                <span>{courseClasses.length} aulas</span>
                              </div>
                              {/* <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>40h de conteúdo</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="h-4 w-4" />
                                <span>500+ alunos</span>
                              </div> */}
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                                Ativo
                              </span>
                              <div className="text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                                Acessar →
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Classes View */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={handleBackToCourses}
                          className="p-3 bg-gray-100 hover:bg-gray-200 rounded-2xl transition-colors"
                        >
                          <ArrowLeft className="h-6 w-6 text-gray-600" />
                        </button>
                        <div>
                          <h2 className="text-3xl font-bold text-gray-900">
                            {selectedCourse?.name}
                          </h2>
                          <p className="text-gray-600">
                            {courseClasses.length} aulas disponíveis
                          </p>
                        </div>
                      </div>
                    </div>

                    {courseClasses.length > 0 ? (
                      <div className="space-y-4">
                        {courseClasses.map((cls, index) => (
                          <div
                            key={cls._id}
                            className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-4 flex-1">
                                <div className="flex-shrink-0">
                                  <div
                                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold ${
                                      cls.type === "video"
                                        ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                                        : "bg-gradient-to-r from-green-500 to-emerald-500"
                                    }`}
                                  >
                                    {index + 1}
                                  </div>
                                </div>

                                <div className="flex-1">
                                  <div className="flex items-center space-x-3 mb-3">
                                    {cls.type === "video" ? (
                                      <Video className="h-5 w-5 text-blue-600" />
                                    ) : (
                                      <FileText className="h-5 w-5 text-green-600" />
                                    )}
                                    <h3 className="font-bold text-gray-900 text-lg">
                                      {cls.title}
                                    </h3>
                                    <span
                                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                        cls.type === "video"
                                          ? "bg-blue-100 text-blue-800"
                                          : "bg-green-100 text-green-800"
                                      }`}
                                    >
                                      {cls.type === "video"
                                        ? "Vídeo Aula"
                                        : "Aula em Texto"}
                                    </span>
                                  </div>

                                  <p className="text-gray-600 mb-3">
                                    {cls.description}
                                  </p>

                                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                                    <span className="flex items-center space-x-1">
                                      <Calendar className="h-4 w-4" />
                                      <span>{cls.createdAt}</span>
                                    </span>
                                    <span className="flex items-center space-x-1">
                                      <Clock className="h-4 w-4" />
                                      <span>30 min</span>
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <button
                                onClick={() => handleWatchClass(cls)}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                              >
                                {cls.type === "video" ? (
                                  <>
                                    <Play className="h-5 w-5" />
                                    <span>Assistir</span>
                                  </>
                                ) : (
                                  <>
                                    <Eye className="h-5 w-5" />
                                    <span>Ler</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <Video className="h-20 w-20 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">
                          Nenhuma aula disponível
                        </h3>
                        <p className="text-gray-500">
                          As aulas aparecerão aqui quando forem disponibilizadas
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* No Access State */}
            {!user?.canAccessClasses && (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <AlertTriangle className="h-20 w-20 text-red-300 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-red-600 mb-4">
                  Acesso Restrito
                </h3>
                <p className="text-red-500 mb-8 text-lg">
                  Seu acesso às aulas ainda não foi liberado
                </p>
                <a
                  href="https://wa.me/5538999921124"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-green-600 to-emerald-700 text-white px-8 py-4 rounded-2xl hover:from-green-700 hover:to-emerald-800 transition-all duration-300 inline-flex items-center space-x-2 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <span>Falar com Suporte</span>
                </a>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <span>Seu Progresso</span>
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Cursos Disponíveis</span>
                  <span className="font-bold text-blue-600 text-lg">
                    {userCourses.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Aulas Disponíveis</span>
                  <span className="font-bold text-green-600 text-lg">
                    {userClasses.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status</span>
                  <span
                    className={`font-bold text-lg ${
                      user?.canAccessClasses ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {user?.canAccessClasses ? "Ativo" : "Pendente"}
                  </span>
                </div>
              </div>
            </div>

            {/* Avaliações */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <StarsIcon className="h-6 w-6 text-orange-600" />
                <h2 className="text-xl font-bold text-gray-900">Avaliações</h2>
              </div>

              {studentEvaluations?.length > 0 ? (
                <div className="space-y-4">
                  {studentEvaluations.map((evaluation) => (
                    <div
                      key={evaluation._id}
                      className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-bold text-gray-900 text-sm">
                              Avaliação #{evaluation._id}
                            </h3>
                            {evaluation.grade && (
                              <div
                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${
                                  evaluation.grade >= 8
                                    ? "bg-green-100 text-green-800"
                                    : evaluation.grade >= 6
                                    ? "bg-yellow-100 text-yellow-800"
                                    : evaluation.grade >= 4
                                    ? "bg-orange-100 text-orange-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {evaluation.grade.toFixed(1)}/10
                              </div>
                            )}
                          </div>

                          <div className="space-y-1">
                            <p className="text-xs text-gray-500 flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>
                                Criada em:{" "}
                                {new Date(
                                  evaluation.createdAt
                                ).toLocaleDateString("pt-BR")}
                              </span>
                            </p>
                            {evaluation.responseDate && (
                              <p className="text-xs text-gray-500 flex items-center space-x-1">
                                <CheckCircle className="h-3 w-3 text-green-600" />
                                <span>
                                  Respondida em:{" "}
                                  {new Date(
                                    evaluation.responseDate
                                  ).toLocaleDateString("pt-BR")}
                                </span>
                              </p>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => handleViewEvaluation(evaluation)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Ver e responder avaliação"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            evaluation.responseDate
                              ? "bg-green-100 text-green-800"
                              : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {evaluation.responseDate ? "Respondida" : "Pendente"}
                        </span>

                        <span className="text-xs text-gray-500">
                          {evaluation.questions.length} pergunta
                          {evaluation.questions.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                  ))}

                  {studentEvaluations.length > 3 && (
                    <button
                      onClick={() => setShowAllEvaluations(true)}
                      className="w-full text-center text-blue-600 hover:text-blue-800 text-sm font-semibold py-2 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Ver todas as avaliações ({studentEvaluations.length})
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <StarsIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">
                    Nenhuma avaliação disponível
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Modal de Visualização e Resposta da Avaliação */}
          {showEvaluationModal && selectedEvaluation && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <StarsIcon className="h-6 w-6 text-orange-600" />
                      <h3 className="text-2xl font-bold text-gray-900">
                        Avaliação #{selectedEvaluation.id}
                      </h3>
                      {selectedEvaluation.grade && (
                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${
                            selectedEvaluation.grade >= 8
                              ? "bg-green-100 text-green-800"
                              : selectedEvaluation.grade >= 6
                              ? "bg-yellow-100 text-yellow-800"
                              : selectedEvaluation.grade >= 4
                              ? "bg-orange-100 text-orange-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          Nota: {selectedEvaluation.grade.toFixed(1)}/10
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setShowEvaluationModal(false);
                        setSelectedEvaluation(null);
                        setEvaluationResponses({});
                      }}
                      className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Criada em:{" "}
                        {new Date(
                          selectedEvaluation.evaluationDate
                        ).toLocaleDateString("pt-BR")}
                      </span>
                    </span>
                    {selectedEvaluation.responseDate && (
                      <span className="flex items-center space-x-1">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>
                          Respondida em:{" "}
                          {new Date(
                            selectedEvaluation.responseDate
                          ).toLocaleDateString("pt-BR")}
                        </span>
                      </span>
                    )}
                  </div>
                </div>

                <form onSubmit={handleEvaluationResponse} className="p-6">
                  <div className="space-y-6">
                    {selectedEvaluation.questions.map((question, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-xl p-4"
                      >
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Pergunta {index + 1}
                        </h4>

                        <p className="text-gray-700 mb-4 bg-gray-50 p-3 rounded-lg">
                          {question.question}
                        </p>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sua Resposta:
                          </label>

                          {question.type === "yesno" ? (
                            <select
                              value={
                                evaluationResponses[index] ||
                                question.answer ||
                                ""
                              }
                              onChange={(e) =>
                                handleResponseChange(index, e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                              disabled={selectedEvaluation.responseDate}
                            >
                              <option value="">Selecione uma resposta</option>
                              <option value="sim">Sim</option>
                              <option value="nao">Não</option>
                            </select>
                          ) : (
                            <textarea
                              value={
                                evaluationResponses[index] ||
                                question.answer ||
                                ""
                              }
                              onChange={(e) =>
                                handleResponseChange(index, e.target.value)
                              }
                              rows={4}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                              placeholder="Digite sua resposta..."
                              disabled={selectedEvaluation.responseDate}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {!selectedEvaluation.responseDate && (
                    <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 mt-6">
                      <button
                        type="button"
                        onClick={() => {
                          setShowEvaluationModal(false);
                          setSelectedEvaluation(null);
                          setEvaluationResponses({});
                        }}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-8 rounded-xl hover:from-orange-700 hover:to-red-700 transition-all duration-300 flex items-center space-x-2 font-semibold shadow-lg hover:shadow-xl"
                      >
                        <Save className="h-5 w-5" />
                        <span>Enviar Respostas</span>
                      </button>
                    </div>
                  )}

                  {selectedEvaluation.responseDate && (
                    <div className="pt-6 border-t border-gray-200 mt-6">
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-green-800 font-semibold">
                          Avaliação já respondida em{" "}
                          {new Date(
                            selectedEvaluation.responseDate
                          ).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Class Viewer Modal */}
      {selectedClass && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-8 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                {selectedClass.type === "video" ? (
                  <div className="p-3 bg-blue-100 rounded-2xl">
                    <Video className="h-8 w-8 text-blue-600" />
                  </div>
                ) : (
                  <div className="p-3 bg-green-100 rounded-2xl">
                    <FileText className="h-8 w-8 text-green-600" />
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedClass.title}
                  </h2>
                  <p className="text-gray-600">{selectedClass.description}</p>
                </div>
              </div>
              <button
                onClick={closeClassViewer}
                className="p-3 hover:bg-gray-100 rounded-2xl transition-colors"
              >
                <X className="h-8 w-8" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto max-h-[calc(90vh-140px)]">
              {selectedClass.type === "video" ? (
                <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
                  {selectedClass.videoUrl ? (
                    selectedClass.videoUrl.includes("youtube.com") ||
                    selectedClass.videoUrl.includes("youtu.be") ? (
                      <iframe
                        src={selectedClass.videoUrl.replace(
                          "watch?v=",
                          "embed/"
                        )}
                        className="w-full h-full"
                        allowFullScreen
                        title={selectedClass.title}
                      />
                    ) : selectedClass.videoUrl.includes("vimeo.com") ? (
                      <iframe
                        src={selectedClass.videoUrl.replace(
                          "vimeo.com/",
                          "player.vimeo.com/video/"
                        )}
                        className="w-full h-full"
                        allowFullScreen
                        title={selectedClass.title}
                      />
                    ) : (
                      <video
                        src={selectedClass.videoUrl}
                        controls
                        className="w-full h-full object-cover"
                      />
                    )
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-500 text-lg">
                        Vídeo não disponível
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="prose prose-lg max-w-none">
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        selectedClass.textContent ||
                        "<p>Conteúdo não disponível</p>",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
