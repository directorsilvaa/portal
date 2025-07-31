import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";
import Header from "../components/Header";
import ClassEditor from "../components/ClassEditor";
import {
  LogOut,
  Plus,
  Users,
  BookOpen,
  Bell,
  Edit,
  Trash2,
  User,
  Settings,
  BarChart3,
  CheckCircle,
  XCircle,
  Video,
  FileText,
  Eye,
  Key,
  Shield,
  Search,
  Filter,
  Save,
  X,
  Calendar,
  Mail,
  Phone,
  UserPlus,
  AlertCircle,
  Upload,
  Image as ImageIcon,
  Sparkles,
  TrendingUp,
  Award,
  Clock,
  Star,
  Image,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const {
    // courses,
    // classes,
    announcements,
    // students,
    // addCourse,
    addClass,
    updateClass,
    deleteClass,
    addAnnouncement,
    addStudent,
    updateStudent,
    // deleteStudent,
    updateStudentCourseAccess,
  } = useData();

  const [activeTab, setActiveTab] = useState("overview");
  const [showClassEditor, setShowClassEditor] = useState(false);
  const [editingClass, setEditingClass] = useState<any>(null);
  const [selectedCourseForClass, setSelectedCourseForClass] = useState("");

  // Search and filter states
  const [studentSearch, setStudentSearch] = useState("");
  const [studentFilter, setStudentFilter] = useState("all");
  const [classSearch, setClassSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");

  // Editing states
  const [editingAnnouncement, setEditingAnnouncement] = useState<any>(null);
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [newClass, setNewClass] = useState({
    title: "",
    description: "",
    type: "video",
    courseId: "",
  });
  // Form states
  const [newCourse, setNewCourse] = useState({
    name: "",
    description: "",
    icon: "BookOpen",
    image: "",
  });
  const [announcementForm, setAnnouncementForm] = useState({
    title: "",
    content: "",
  });
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    password: "",
    role: "student" as const,
    canAccessClasses: true,
    courseAccess: [] as string[],
    telefone: "",
    estado: "",
    cidade: "",
  });

  const [students, setStudents] = useState([]);
  const [classes, setLessons] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar dados dos estudantes
  const fetchDataStudents = async () => {
    try {
      const token = localStorage.getItem("token"); // Recupera o token do local storage
      const response = await axios.get(
        "https://portal-backend-kvw9.onrender.com/api/auth/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStudents(response.data?.user); // Armazena os dados dos estudantes
    } catch (error) {
      console.error("Erro ao buscar estudantes:", error);
    }
  };

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
      await Promise.all([
        fetchDataStudents(),
        fetchDataLesson(),
        fetchDataCourse(),
      ]);
      setLoading(false); // Finaliza o carregamento
    };

    fetchData();
  }, []); // Executa apenas uma vez quando o componente é montado

  // Filter functions
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      student.email.toLowerCase().includes(studentSearch.toLowerCase());

    const matchesFilter =
      studentFilter === "all" ||
      (studentFilter === "active" && student.canAccessClasses) ||
      (studentFilter === "inactive" && !student.canAccessClasses);

    return matchesSearch && matchesFilter;
  });

  const filteredClasses = classes.filter((cls) => {
    const matchesSearch =
      cls.title.toLowerCase().includes(classSearch.toLowerCase()) ||
      cls.description.toLowerCase().includes(classSearch.toLowerCase());

    const matchesFilter =
      courseFilter === "all" || cls.courseId === courseFilter;

    return matchesSearch && matchesFilter;
  });

  // Event handlers
  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Recupera o token do local storage
      const token = localStorage.getItem("token"); // Substitua "token" pela chave que você
      if (editingCourse) {
        // Update course logic would go here

        const response = await axios.put(
          `https://portal-backend-kvw9.onrender.com/api/courses/update-course/${editingCourse._id}`,
          newCourse,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
            },
          }
        );

        if (response?.data) {
          toast.success("Curso editado com sucesso.");
          fetchDataCourse;
          await fetchDataCourse();
          setIsModalOpen(false);
        } else {
          toast.error("Erro ao editar Curso.");
        }
        setEditingCourse(null);
      } else {
        // console.log("oi", newCourse);
        // return;

        // Faz a requisição POST com o token no cabeçalho
        const response = await axios.post(
          "https://portal-backend-kvw9.onrender.com/api/courses",
          newCourse,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
            },
          }
        );

        if (response?.data) {
          toast.success("Curso criado com sucesso.");
          fetchDataCourse;
          await fetchDataCourse();
          setIsModalOpen(false);
        } else {
          toast.error("Erro ao criar Curso.");
        }
      }
    } catch (error) {
      toast.error("Erro ao criar Curso.");
    }
    // setNewCourse({ name: "", description: "", icon: "BookOpen", image: "" });
  };

  const handleEditCourse = (course: any) => {
    setEditingCourse(course);
    setNewCourse({
      name: course.name,
      description: course.description,
      icon: course.icon,
      image: course.image || "",
    });
    setIsModalOpen(true);
  };

  const handleDeleteCourse = (courseId: string) => {
    if (
      confirm(
        "Tem certeza que deseja excluir este curso? Todas as aulas relacionadas também serão removidas."
      )
    ) {
      // Delete course logic would go here
      console.log("Delete course:", courseId);
    }
  };

  const openCreateModal = () => {
    setEditingCourse(null);
    setNewCourse({ name: "", description: "", icon: "BookOpen", image: "" });
    setIsModalOpen(true);
  };
  const openCreateModalAulas = () => {
    // set({ name: "", description: "", icon: "BookOpen", image: "" });
    setShowClassEditor(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCourse(null);
    setNewCourse({ name: "", description: "", icon: "BookOpen", image: "" });
  };

  const getIconEmoji = (iconName) => {
    const icons = {
      BookOpen: "📚",
      Code: "💻",
      Megaphone: "📢",
      Palette: "🎨",
    };
    return icons[iconName] || "📚";
  };

  const handleAnnouncementSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAnnouncement) {
      console.log(
        "Update announcement:",
        editingAnnouncement.id,
        announcementForm
      );
    } else {
      addAnnouncement(announcementForm);
    }
    setAnnouncementForm({ title: "", content: "" });
    setEditingAnnouncement(null);
    setShowAnnouncementForm(false);
  };

  const handleEditAnnouncement = (announcement: any) => {
    setEditingAnnouncement(announcement);
    setAnnouncementForm({
      title: announcement.title,
      content: announcement.content,
    });
    setShowAnnouncementForm(true);
  };

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Substitua "token" pela chave que você

    try {
      if (editingStudent) {
        // updateStudent(editingStudent.id, newStudent);
        const response = await axios.put(
          `https://portal-backend-kvw9.onrender.com/api/auth/aluno-update/${editingStudent._id}`,
          {
            ...newStudent,
            status:
              newStudent.canAccessClasses === true ? "active" : "inactive",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
            },
          }
        );

        if (response?.data) {
          toast.success("Alino editado com sucesso.");
          fetchDataCourse;
          await fetchDataStudents();
          setIsModalOpen(false);
        } else {
          toast.error("Erro ao editar Aluno.");
        }
        setEditingStudent(null);
      } else {
        const response = await axios.post(
          "https://portal-backend-kvw9.onrender.com/api/auth/register-admin",
          {
            ...newStudent,
            status: newStudent.canAccessClasses ? "active" : "inactive",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
            },
          }
        );

        if (response?.data) {
          toast.success("Aluno criado com sucesso.");
          fetchDataCourse;
          await fetchDataStudents();
          setIsModalOpen(false);
          setEditingStudent(null);
          setNewStudent({
            name: "",
            email: "",
            password: "",
            role: "student",
            canAccessClasses: true,
            courseAccess: [],
            telefone: "",
            cidade: "",
            estado: "",
          });
        } else {
          toast.error("Erro ao criar Aluno.");
        }
        // addStudent(newStudent);
      }
    } catch (error) {
      toast.error("Erro ao criar Aluno.");
    }

    // setNewStudent({
    //   name: "",
    //   email: "",
    //   password: "",
    //   role: "student",
    //   canAccessClasses: true,
    //   courseAccess: [],
    // });
  };

  const handleEditStudent = (student: any) => {
    setEditingStudent(student);
    setNewStudent({
      name: student.name,
      email: student.email,
      password: "",
      role: student.role,
      canAccessClasses: student.canAccessClasses,
      courseAccess: student.courseAccess || [],
      telefone: student.telefone || "",
      estado: student.estado || "",
      cidade: student.cidade || "",
    });
    setShowStudentModal(true);
  };

  const handleSaveClass = async (classData: any) => {
    try {
      const token = localStorage.getItem("token"); // Substitua "token" pela chave que você

      if (editingClass) {
        const response = await axios.put(
          `https://portal-backend-kvw9.onrender.com/api/lessons/aula-update/${editingClass._id}`,
          {
            ...classData,
            course: newClass?.courseId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
            },
          }
        );

        if (response?.data) {
          toast.success("Aula editada com sucesso.");
          fetchDataCourse;
          await fetchDataLesson();
          setShowClassEditor(false);
          setEditingClass(null);
          setSelectedCourseForClass("");
        } else {
          toast.error("Erro ao editar Curso.");
        }
      } else {
        const response = await axios.post(
          "https://portal-backend-kvw9.onrender.com/api/lessons",
          {
            ...classData,
            course: newClass?.courseId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
            },
          }
        );

        if (response?.data) {
          toast.success("Aula criada com sucesso");
          await fetchDataLesson();
          setShowClassEditor(false);
          setEditingClass(null);
          setSelectedCourseForClass("");
        }
      }
    } catch (error) {
      toast.error("Erro ao criar Aula");
    }
  };

  const handleEditClass = (cls: any) => {
    setEditingClass(cls);
    setShowClassEditor(true);
  };

  const handleDeleteClass = (classId: string) => {
    if (confirm("Tem certeza que deseja excluir esta aula?")) {
      deleteClass(classId);
    }
  };

  const deleteStudent = async (id: string) => {
    try {
      const token = localStorage.getItem("token"); // Substitua "token" pela chave que você

      const response = await axios.delete(
        `https://portal-backend-kvw9.onrender.com/api/auth/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
          },
        }
      );

      if (response?.data) {
        toast.success("Aluno deletado com sucesso.");
        fetchDataCourse;
        await fetchDataStudents();
      } else {
        toast.error("Erro ao criar Curso.");
      }
    } catch (error) {
      toast.error("Erro ao deletar Aluno.");
    }
  };

  const tabButtons = [
    { id: "overview", label: "Dashboard", icon: BarChart3 },
    { id: "courses", label: "Cursos", icon: BookOpen },
    { id: "classes", label: "Aulas", icon: Video },
    { id: "announcements", label: "Avisos", icon: Bell },
    { id: "students", label: "Alunos", icon: Users },
  ];
  if (loading) {
    return <div>Carregando...</div>;
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Admin Header */}
        <div className="bg-[#c1aa78] rounded-3xl p-8 text-white mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-sm font-medium mb-4 border border-white border-opacity-20">
                <Sparkles className="h-4 w-4 mr-2" />
                Painel Administrativo
              </div>
              <h1 className="text-4xl font-bold mb-2">
                Bem-vindo, {user?.name}! 👋
              </h1>
              <p className="text-purple-100 text-lg">
                Gerencie sua plataforma educacional com facilidade
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 border border-white border-opacity-20">
                <Settings className="h-8 w-8" />
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

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              {tabButtons.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-6 px-4 border-b-2 font-semibold text-sm transition-all duration-200 flex items-center space-x-3 ${
                      activeTab === tab.id
                        ? "border-[#003b5f] text-[#003b5f] bg-purple-50"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-[#003b5f] rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">
                        Total de Cursos
                      </p>
                      <p className="text-3xl font-bold">{courses.length}</p>
                    </div>
                    <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                      <BookOpen className="h-8 w-8" />
                    </div>
                  </div>
                </div>

                <div className="bg-[#003b5f] rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm font-medium">
                        Total de Aulas
                      </p>
                      <p className="text-3xl font-bold">{classes.length}</p>
                    </div>
                    <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                      <Video className="h-8 w-8" />
                    </div>
                  </div>
                </div>

                <div className="bg-[#003b5f] rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm font-medium">
                        Total de Alunos
                      </p>
                      <p className="text-3xl font-bold">{students.length}</p>
                    </div>
                    <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                      <Users className="h-8 w-8" />
                    </div>
                  </div>
                </div>

                {/* <div className="bg-[#003b5f] rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm font-medium">
                        Avisos Ativos
                      </p>
                      <p className="text-3xl font-bold">
                        {announcements.length}
                      </p>
                      <p className="text-orange-100 text-xs mt-1">
                        Todos ativos
                      </p>
                    </div>
                    <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                      <Bell className="h-8 w-8" />
                    </div>
                  </div>
                </div> */}
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                  <Sparkles className="h-6 w-6 text-[#003b5f]" />
                  <span>Ações Rápidas</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button
                    onClick={() => setActiveTab("courses")}
                    className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300 group"
                  >
                    <Plus className="h-8 w-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Novo Curso
                    </h3>
                    <p className="text-sm text-gray-600">Adicionar curso</p>
                  </button>

                  <button
                    onClick={() => setActiveTab("classes")}
                    className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 hover:shadow-lg transition-all duration-300 group"
                  >
                    <Video className="h-8 w-8 text-green-600 mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Nova Aula
                    </h3>
                    <p className="text-sm text-gray-600">Criar aula</p>
                  </button>

                  <button
                    onClick={() => setActiveTab("students")}
                    className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300 group"
                  >
                    <UserPlus className="h-8 w-8 text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Novo Aluno
                    </h3>
                    <p className="text-sm text-gray-600">Cadastrar aluno</p>
                  </button>

                  <button
                    onClick={() => setActiveTab("announcements")}
                    className="p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-200 hover:shadow-lg transition-all duration-300 group"
                  >
                    <Bell className="h-8 w-8 text-orange-600 mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Novo Aviso
                    </h3>
                    <p className="text-sm text-gray-600">Publicar aviso</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === "courses" && (
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Gerenciar Cursos
                  </h1>
                  <p className="text-gray-600">
                    Organize e administre seus cursos online
                  </p>
                </div>
                <button
                  onClick={openCreateModal}
                  className="mt-4 sm:mt-0 bg-[#003b5f] text-white py-3 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center space-x-2 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Plus className="h-5 w-5" />
                  <span>Novo Curso</span>
                </button>
              </div>

              {/* Lista de Cursos */}
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <BookOpen className="h-6 w-6 text-green-600" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Cursos Cadastrados
                  </h2>
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                    {courses.length}
                  </span>
                </div>

                {courses.length === 0 ? (
                  <div className="text-center py-16">
                    <BookOpen className="h-20 w-20 text-gray-300 mx-auto mb-6" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-3">
                      Nenhum curso cadastrado
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Crie seu primeiro curso para começar
                    </p>
                    <button
                      onClick={openCreateModal}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center space-x-2 font-semibold mx-auto"
                    >
                      <Plus className="h-5 w-5" />
                      <span>Criar Primeiro Curso</span>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {courses.map((course) => (
                      <div
                        key={course.id}
                        className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group bg-white"
                      >
                        {/* Imagem do Curso */}
                        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
                          {course.image ? (
                            <img
                              src={course.image}
                              alt={course.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <BookOpen className="h-16 w-16 text-white opacity-80" />
                            </div>
                          )}
                          <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg px-3 py-1">
                            <span className="text-2xl">
                              {getIconEmoji(course.icon)}
                            </span>
                          </div>
                        </div>

                        {/* Conteúdo do Card */}
                        <div className="p-6">
                          <h3 className="font-bold text-gray-900 text-lg mb-3 line-clamp-2">
                            {course.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {course.description}
                          </p>

                          <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-purple-600 bg-purple-50 px-3 py-1.5 rounded-full font-medium">
                              {
                                classes.filter(
                                  (c) => c.course?._id === course._id
                                ).length
                              }{" "}
                              aulas
                            </span>
                          </div>

                          {/* Botões de Ação */}
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEditCourse(course)}
                              className="flex-1 bg-blue-50 text-blue-600 hover:bg-blue-100 py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 font-medium"
                              title="Editar"
                            >
                              <Edit className="h-4 w-4" />
                              <span className="hidden sm:inline">Editar</span>
                            </button>
                            <button
                              onClick={() => handleDeleteCourse(course.id)}
                              className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 font-medium"
                              title="Excluir"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="hidden sm:inline">Excluir</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header do Modal */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                    <Plus className="h-6 w-6 text-blue-600" />
                    <span>
                      {editingCourse ? "Editar Curso" : "Adicionar Novo Curso"}
                    </span>
                  </h2>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="h-6 w-6 text-gray-500" />
                  </button>
                </div>

                {/* Conteúdo do Modal */}
                <div className="p-6">
                  {editingCourse && (
                    <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <p className="text-blue-800 font-medium">
                        Editando: {editingCourse.name}
                      </p>
                    </div>
                  )}

                  <div onSubmit={handleAddCourse} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Nome do Curso
                      </label>
                      <input
                        type="text"
                        value={newCourse.name}
                        onChange={(e) =>
                          setNewCourse({ ...newCourse, name: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="Ex: Desenvolvimento Web Completo"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Descrição
                      </label>
                      <textarea
                        value={newCourse.description}
                        onChange={(e) =>
                          setNewCourse({
                            ...newCourse,
                            description: e.target.value,
                          })
                        }
                        required
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="Descreva o que o aluno aprenderá neste curso..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Ícone
                        </label>
                        <select
                          value={newCourse.icon}
                          onChange={(e) =>
                            setNewCourse({ ...newCourse, icon: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        >
                          <option value="BookOpen">📚 Livro</option>
                          <option value="Code">💻 Código</option>
                          <option value="Megaphone">📢 Marketing</option>
                          <option value="Palette">🎨 Design</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          <Image className="h-4 w-4 inline mr-1" />
                          URL da Imagem
                        </label>
                        <input
                          type="url"
                          value={newCourse.image}
                          onChange={(e) =>
                            setNewCourse({
                              ...newCourse,
                              image: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          placeholder="https://exemplo.com/imagem.jpg"
                        />
                      </div>
                    </div>

                    {newCourse.image && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Preview da Imagem
                        </label>
                        <div className="w-full h-48 bg-gray-100 rounded-xl overflow-hidden">
                          <img
                            src={newCourse.image}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Botões do Modal */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      <button
                        type="button"
                        onClick={close}
                        className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        onClick={handleAddCourse}
                        className="w-full sm:flex-1 bg-[#003b5f] text-white py-3 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-3 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <Save className="h-5 w-5" />
                        <span>
                          {editingCourse
                            ? "Atualizar Curso"
                            : "Adicionar Curso"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Classes Tab */}
          {activeTab === "classes" && (
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Header with Search and Filters */}
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <div className="flex flex-col space-y-4 mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                      <Video className="h-6 w-6 text-purple-600" />
                      <span>Gerenciar Aulas</span>
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                        {filteredClasses.length}
                      </span>
                    </h2>

                    {/* Mobile Filter Toggle */}
                    <button
                      onClick={() => setShowMobileFilters(!showMobileFilters)}
                      className="sm:hidden mt-4 bg-gray-100 text-gray-600 px-4 py-2 rounded-xl flex items-center space-x-2"
                    >
                      <Filter className="h-4 w-4" />
                      <span>Filtros</span>
                    </button>
                  </div>

                  {/* Filters - Desktop always visible, Mobile toggleable */}
                  <div
                    className={`${
                      showMobileFilters ? "block" : "hidden"
                    } sm:block`}
                  >
                    <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4">
                      {/* Search */}
                      <div className="relative flex-1 sm:flex-none sm:w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Buscar aulas..."
                          value={classSearch}
                          onChange={(e) => setClassSearch(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                      </div>

                      {/* Course Filter */}
                      <select
                        value={courseFilter}
                        onChange={(e) => setCourseFilter(e.target.value)}
                        className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="all">Todos os cursos</option>
                        {courses.map((course) => (
                          <option key={course._id} value={course._id}>
                            {course.name}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={openCreateModalAulas}
                        className="w-full sm:w-auto bg-[#003b5f] text-white px-6 py-2 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-2 font-medium shadow-lg hover:shadow-xl"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Nova Aula</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Classes List */}
                <div className="space-y-4">
                  {filteredClasses.map((cls) => {
                    const course = courses.find(
                      (c) => c._id === cls.course?._id
                    );
                    return (
                      <div
                        key={cls.id}
                        className="border border-gray-200 rounded-xl p-4 md:p-6 hover:shadow-lg transition-all duration-300 group"
                      >
                        {/* Mobile Layout */}
                        <div className="block md:hidden">
                          <div className="flex items-start space-x-3 mb-3">
                            {cls.type === "video" ? (
                              <div className="p-2 bg-blue-100 rounded-lg shrink-0">
                                <Video className="h-4 w-4 text-blue-600" />
                              </div>
                            ) : (
                              <div className="p-2 bg-green-100 rounded-lg shrink-0">
                                <FileText className="h-4 w-4 text-green-600" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-gray-900 text-base truncate mb-1">
                                {cls.title}
                              </h3>
                              <span
                                className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                                  cls.type === "video"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {cls.type === "video" ? "Vídeo" : "Texto"}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1 shrink-0">
                              <button
                                onClick={() => handleEditClass(cls)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Editar"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteClass(cls.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Excluir"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>

                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {cls.description}
                          </p>

                          <div className="flex flex-col space-y-2 text-xs text-gray-500">
                            <span className="flex items-center space-x-1">
                              <BookOpen className="h-3 w-3" />
                              <span className="truncate">{course?.name}</span>
                            </span>
                            <div className="flex items-center space-x-4">
                              <span className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span>{cls.createdAt}</span>
                              </span>
                              {cls.updatedAt && (
                                <span className="text-orange-600 flex items-center space-x-1">
                                  <Clock className="h-3 w-3" />
                                  <span>Atualizado</span>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Desktop Layout */}
                        <div className="hidden md:flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              {cls.type === "video" ? (
                                <div className="p-2 bg-blue-100 rounded-lg">
                                  <Video className="h-5 w-5 text-blue-600" />
                                </div>
                              ) : (
                                <div className="p-2 bg-green-100 rounded-lg">
                                  <FileText className="h-5 w-5 text-green-600" />
                                </div>
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

                            <div className="flex items-center space-x-6 text-sm text-gray-500">
                              <span className="flex items-center space-x-1">
                                <BookOpen className="h-4 w-4" />
                                <span>{course?.name}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{cls.createdAt}</span>
                              </span>
                              {cls.updatedAt && (
                                <span className="text-orange-600 flex items-center space-x-1">
                                  <Clock className="h-4 w-4" />
                                  <span>Atualizado: {cls.updatedAt}</span>
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 ml-4">
                            <button
                              onClick={() => handleEditClass(cls)}
                              className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                              title="Editar"
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteClass(cls.id)}
                              className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                              title="Excluir"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {filteredClasses.length === 0 && (
                    <div className="text-center py-16">
                      <Video className="h-16 md:h-20 w-16 md:w-20 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg md:text-xl font-semibold text-gray-600 mb-2">
                        {classSearch || courseFilter !== "all"
                          ? "Nenhuma aula encontrada"
                          : "Nenhuma aula cadastrada"}
                      </h3>
                      <p className="text-gray-500 text-sm md:text-base">
                        {classSearch || courseFilter !== "all"
                          ? "Tente ajustar os filtros de busca"
                          : "Comece criando sua primeira aula"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Modal */}
          {showClassEditor && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header do Modal */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center space-x-3">
                    <Video className="h-6 w-6 text-purple-600" />
                    <span>{editingClass ? "Editar Aula" : "Nova Aula"}</span>
                  </h2>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="h-6 w-6 text-gray-500" />
                  </button>
                </div>

                {/* Conteúdo do Modal */}
                <div className="p-6">
                  {editingClass && (
                    <div className="mb-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
                      <p className="text-purple-800 font-medium">
                        Editando: {editingClass.title}
                      </p>
                    </div>
                  )}

                  <div className="space-y-6">
                    {/* Course Selection for New Class */}

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Título da Aula
                      </label>
                      <input
                        type="text"
                        value={newClass.title}
                        onChange={(e) =>
                          setNewClass({ ...newClass, title: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="Ex: Introdução ao HTML"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Descrição
                      </label>
                      <textarea
                        value={newClass.description}
                        onChange={(e) =>
                          setNewClass({
                            ...newClass,
                            description: e.target.value,
                          })
                        }
                        required
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="Descreva o conteúdo desta aula..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Curso
                        </label>
                        <select
                          value={newClass.courseId}
                          onChange={(e) =>
                            setNewClass({
                              ...newClass,
                              courseId: e.target.value,
                            })
                          }
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        >
                          <option value="">Selecione um curso</option>
                          {courses.map((course) => (
                            <option key={course.id} value={course.id}>
                              {course.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Tipo de Aula
                        </label>
                        <select
                          value={newClass.type}
                          onChange={(e) =>
                            setNewClass({ ...newClass, type: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        >
                          <option value="video">📹 Vídeo Aula</option>
                          <option value="text">📝 Aula em Texto</option>
                        </select>
                      </div>
                    </div>

                    {/* Botões do Modal */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handleSaveClass}
                        className="w-full sm:flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-3 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <Video className="h-5 w-5" />
                        <span>
                          {editingClass ? "Atualizar Aula" : "Criar Aula"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Announcements Tab */}
          {activeTab === "announcements" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                    <Bell className="h-6 w-6 text-orange-600" />
                    <span>
                      {editingAnnouncement
                        ? "Editar Avaliação"
                        : "Adicionar Nova Avaliação"}
                    </span>
                  </h2>
                  {editingAnnouncement && (
                    <button
                      onClick={() => {
                        setEditingAnnouncement(null);
                        setAnnouncementForm({ title: "", content: "" });
                        setShowAnnouncementForm(false);
                      }}
                      className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <form onSubmit={handleAnnouncementSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Título do Avaliação
                    </label>
                    <input
                      type="text"
                      value={announcementForm.title}
                      onChange={(e) =>
                        setAnnouncementForm({
                          ...announcementForm,
                          title: e.target.value,
                        })
                      }
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="Ex: Nova turma disponível"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Descrição
                    </label>
                    <textarea
                      value={announcementForm.content}
                      onChange={(e) =>
                        setAnnouncementForm({
                          ...announcementForm,
                          content: e.target.value,
                        })
                      }
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="Digite o conteúdo do aviso..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 px-6 rounded-xl hover:from-orange-700 hover:to-red-700 transition-all duration-300 flex items-center justify-center space-x-3 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Save className="h-5 w-5" />
                    <span>
                      {editingAnnouncement
                        ? "Atualizar Avaliação"
                        : "Publicar Avaliação"}
                    </span>
                  </button>
                </form>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                  <Bell className="h-6 w-6 text-green-600" />
                  <span>Avaliações Publicados</span>
                </h2>

                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-gray-900 text-lg">
                          {announcement.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditAnnouncement(announcement)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Editar"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (
                                confirm(
                                  "Tem certeza que deseja excluir este aviso?"
                                )
                              ) {
                                console.log(
                                  "Delete announcement:",
                                  announcement.id
                                );
                              }
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Excluir"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">
                        {announcement.content}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-gray-500 text-sm flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {announcement.createdAt.toLocaleDateString()}
                          </span>
                        </p>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                          Ativo
                        </span>
                      </div>
                    </div>
                  ))}

                  {announcements.length === 0 && (
                    <div className="text-center py-16">
                      <Bell className="h-20 w-20 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">
                        Nenhum aviso publicado
                      </h3>
                      <p className="text-gray-500">
                        Crie o primeiro aviso para seus alunos
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Students Tab */}
          {activeTab === "students" && (
            <div className="space-y-8">
              {/* Modal for Add/Edit Student */}
              {showStudentModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                          <UserPlus className="h-6 w-6 text-purple-600" />
                          <span>
                            {editingStudent
                              ? "Editar Aluno"
                              : "Adicionar Novo Aluno"}
                          </span>
                        </h2>
                        <button
                          onClick={() => setShowStudentModal(false)}
                          className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                        >
                          <X className="h-6 w-6 text-gray-500" />
                        </button>
                      </div>

                      {editingStudent && (
                        <div className="mt-4 p-4 bg-purple-50 rounded-xl border border-purple-200">
                          <p className="text-purple-800 font-medium">
                            Editando: {editingStudent.name}
                          </p>
                          <button
                            onClick={() => {
                              setEditingStudent(null);
                              setNewStudent({
                                name: "",
                                email: "",
                                password: "",
                                role: "student",
                                canAccessClasses: true,
                                courseAccess: [],
                                telefone: "",
                                cidade: "",
                                estado: "",
                              });
                            }}
                            className="text-purple-600 hover:text-purple-700 text-sm mt-1"
                          >
                            Cancelar edição
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <form onSubmit={handleAddStudent} className="space-y-8">
                        {/* Informações Básicas */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                            <User className="h-5 w-5 text-purple-600" />
                            <span>Informações Básicas</span>
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Nome Completo
                              </label>
                              <input
                                type="text"
                                value={newStudent.name}
                                onChange={(e) =>
                                  setNewStudent({
                                    ...newStudent,
                                    name: e.target.value,
                                  })
                                }
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder="João Silva"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Telefone
                              </label>
                              <input
                                type="text"
                                value={newStudent.telefone}
                                onChange={(e) =>
                                  setNewStudent({
                                    ...newStudent,
                                    telefone: e.target.value,
                                  })
                                }
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder="Telefone"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Cidade
                              </label>
                              <input
                                type="text"
                                value={newStudent.cidade}
                                onChange={(e) =>
                                  setNewStudent({
                                    ...newStudent,
                                    cidade: e.target.value,
                                  })
                                }
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder="Estado"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Estado
                              </label>
                              <input
                                type="text"
                                value={newStudent.estado}
                                onChange={(e) =>
                                  setNewStudent({
                                    ...newStudent,
                                    estado: e.target.value,
                                  })
                                }
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder="Estado"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Email
                              </label>
                              <input
                                type="email"
                                value={newStudent.email}
                                onChange={(e) =>
                                  setNewStudent({
                                    ...newStudent,
                                    email: e.target.value,
                                  })
                                }
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder="joao@email.com"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-1">
                                <Key className="h-4 w-4" />
                                <span>
                                  Senha{" "}
                                  {editingStudent
                                    ? "(deixe vazio para manter)"
                                    : "Inicial"}
                                </span>
                              </label>
                              <input
                                type="password"
                                value={newStudent.password}
                                onChange={(e) =>
                                  setNewStudent({
                                    ...newStudent,
                                    password: e.target.value,
                                  })
                                }
                                required={!editingStudent}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder="123456"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Status Geral
                              </label>
                              <select
                                value={
                                  newStudent.canAccessClasses
                                    ? "active"
                                    : "inactive"
                                }
                                onChange={(e) =>
                                  setNewStudent({
                                    ...newStudent,
                                    canAccessClasses:
                                      e.target.value === "active",
                                  })
                                }
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                              >
                                <option value="active">
                                  ✅ Acesso Liberado
                                </option>
                                <option value="inactive">
                                  ❌ Acesso Restrito
                                </option>
                              </select>
                              <p className="text-xs text-gray-500 mt-1">
                                O status geral controla se o aluno pode acessar
                                a plataforma
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Controle de Acesso por Curso */}
                        <div className="border-t border-gray-200 pt-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                            <Shield className="h-5 w-5 text-purple-600" />
                            <span>Controle de Acesso por Curso</span>
                          </h3>
                          <p className="text-sm text-gray-600 mb-6">
                            Selecione quais cursos este aluno poderá acessar.
                            Mesmo com acesso liberado, o aluno só poderá ver os
                            cursos marcados abaixo.
                          </p>

                          {courses.length > 0 ? (
                            <div className="space-y-3">
                              {/* Botões de seleção rápida */}
                              <div className="flex flex-wrap gap-2 mb-4">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setNewStudent({
                                      ...newStudent,
                                      courseAccess: courses.map(
                                        (course) => course._id
                                      ),
                                    })
                                  }
                                  className="px-3 py-1.5 text-xs font-medium text-green-700 bg-green-100 hover:bg-green-200 rounded-lg transition-colors"
                                >
                                  Selecionar Todos
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setNewStudent({
                                      ...newStudent,
                                      courseAccess: [],
                                    })
                                  }
                                  className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-100 hover:bg-red-200 rounded-lg transition-colors"
                                >
                                  Desmarcar Todos
                                </button>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {courses.map((course) => {
                                  const hasAccess =
                                    newStudent.courseAccess?.includes(
                                      course._id
                                    ) || false;
                                  const courseClassCount = classes.filter(
                                    (c) => c.course?._id === course._id
                                  ).length;

                                  return (
                                    <label
                                      key={course._id}
                                      className={`flex items-center space-x-3 p-4 border rounded-xl cursor-pointer transition-all ${
                                        hasAccess
                                          ? "border-green-300 bg-green-50 shadow-sm"
                                          : "border-gray-200 hover:bg-gray-50"
                                      }`}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={hasAccess}
                                        onChange={(e) => {
                                          const courseId = course._id;
                                          const currentAccess =
                                            newStudent.courseAccess || [];

                                          if (e.target.checked) {
                                            setNewStudent({
                                              ...newStudent,
                                              courseAccess: [
                                                ...currentAccess,
                                                courseId,
                                              ],
                                            });
                                          } else {
                                            setNewStudent({
                                              ...newStudent,
                                              courseAccess:
                                                currentAccess.filter(
                                                  (id) => id !== courseId
                                                ),
                                            });
                                          }
                                        }}
                                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 h-5 w-5 flex-shrink-0"
                                      />
                                      <div className="flex-1 min-w-0">
                                        <div className="font-semibold text-gray-900 text-sm truncate">
                                          {course.name}
                                        </div>
                                        <div className="text-xs text-gray-500 flex items-center space-x-2">
                                          <span>{courseClassCount} aulas</span>
                                          {hasAccess && (
                                            <span className="text-green-600">
                                              • Liberado
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>
                          ) : (
                            <div className="text-center py-8 bg-gray-50 rounded-xl">
                              <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                              <p className="text-gray-500 text-sm">
                                Nenhum curso cadastrado ainda.
                              </p>
                              <p className="text-gray-400 text-xs mt-1">
                                Cadastre cursos primeiro para definir permissões
                                de acesso.
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Botões de Ação */}
                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-6 border-t border-gray-200">
                          <button
                            type="button"
                            onClick={() => {
                              setShowStudentModal(false);
                              setNewStudent({
                                name: "",
                                email: "",
                                password: "",
                                role: "student",
                                canAccessClasses: true,
                                courseAccess: [],
                                telefone: "",
                                cidade: "",
                                estado: "",
                              });
                              setEditingStudent(null);
                            }}
                            className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-200 transition-all duration-300 flex items-center justify-center space-x-2 font-semibold"
                          >
                            <span>Cancelar</span>
                          </button>
                          <button
                            type="submit"
                            className="flex-1 bg-[#003b5f] text-white py-3 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-2 font-semibold shadow-lg hover:shadow-xl"
                          >
                            <Save className="h-4 w-4" />
                            <span>
                              {editingStudent ? "Atualizar" : "Adicionar"}
                            </span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {/* Students Management */}
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col space-y-4 mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center space-x-3">
                      <Users className="h-6 w-6 text-blue-600" />
                      <span>Alunos ({filteredStudents.length})</span>
                    </h2>

                    <button
                      onClick={() => setShowStudentModal(true)}
                      className="bg-[#003b5f] text-white py-3 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-2 font-semibold shadow-lg hover:shadow-xl"
                    >
                      <UserPlus className="h-4 w-4" />
                      <span>Novo Aluno</span>
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Buscar por nome ou email..."
                        value={studentSearch}
                        onChange={(e) => setStudentSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div className="relative sm:w-48">
                      <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <select
                        value={studentFilter}
                        onChange={(e) => setStudentFilter(e.target.value)}
                        className="w-full pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none bg-white"
                      >
                        <option value="all">Todos os alunos</option>
                        <option value="active">Acesso liberado</option>
                        <option value="inactive">Acesso restrito</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Students List */}
                <div className="space-y-4">
                  {filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      {/* Student Header */}
                      <div className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-4 sm:space-y-0">
                          <div className="flex items-start space-x-4">
                            <div
                              className={`p-3 rounded-2xl flex-shrink-0 ${
                                student.canAccessClasses
                                  ? "bg-green-100"
                                  : "bg-red-100"
                              }`}
                            >
                              <User
                                className={`h-6 w-6 sm:h-8 sm:w-8 ${
                                  student.canAccessClasses
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-gray-900 text-lg sm:text-xl truncate">
                                {student.name}
                              </h3>
                              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-gray-600 mt-1 space-y-1 sm:space-y-0">
                                <span className="flex items-center space-x-1 text-sm sm:text-base">
                                  <Mail className="h-4 w-4 flex-shrink-0" />
                                  <span className="truncate">
                                    {student.email}
                                  </span>
                                </span>
                                <span className="flex items-center space-x-1 text-sm sm:text-base">
                                  <Phone className="h-4 w-4 flex-shrink-0" />
                                  <span className="truncate">
                                    {student.telefone || "Sem Telefone"}
                                  </span>
                                </span>
                                <span className="flex items-center space-x-1 text-sm sm:text-base">
                                  <Phone className="h-4 w-4 flex-shrink-0" />
                                  <span className="truncate">
                                    {`${
                                      student?.cidade
                                        ? `${student.cidade}/${student.estado}`
                                        : "Sem Cidade e Estado"
                                    }` || "Sem Telefone"}
                                  </span>
                                </span>
                                <span
                                  className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                                    student.canAccessClasses
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {student.canAccessClasses
                                    ? "✅ Liberado"
                                    : "❌ Restrito"}
                                </span>
                              </div>

                              {/* Course Access Summary */}
                              <div className="mt-3">
                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                  <Shield className="h-4 w-4" />
                                  <span>
                                    Acesso a {student.courseAccess?.length || 0}{" "}
                                    de {courses.length} cursos
                                  </span>
                                </div>

                                {student.courseAccess &&
                                  student.courseAccess.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-1">
                                      {student.courseAccess
                                        .slice(0, 3)
                                        .map((courseId) => {
                                          const course = courses.find(
                                            (c) => c.id === courseId
                                          );
                                          return course ? (
                                            <span
                                              key={courseId}
                                              className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-md"
                                            >
                                              {course.name}
                                            </span>
                                          ) : null;
                                        })}
                                      {student.courseAccess.length > 3 && (
                                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-md">
                                          +{student.courseAccess.length - 3}{" "}
                                          mais
                                        </span>
                                      )}
                                    </div>
                                  )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 flex-shrink-0">
                            <button
                              onClick={() => handleEditStudent(student)}
                              className="p-2 sm:p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                              title="Editar aluno"
                            >
                              <Edit className="h-4 w-4 sm:h-5 sm:w-5" />
                            </button>
                            {/* <button
                              onClick={() =>
                                updateStudent(student.id, {
                                  canAccessClasses: !student.canAccessClasses,
                                })
                              }
                              className={`p-2 sm:p-3 rounded-xl transition-colors ${
                                student.canAccessClasses
                                  ? "bg-green-100 text-green-600 hover:bg-green-200"
                                  : "bg-red-100 text-red-600 hover:bg-red-200"
                              }`}
                              title={
                                student.canAccessClasses
                                  ? "Remover acesso geral"
                                  : "Liberar acesso geral"
                              }
                            >
                              {student.canAccessClasses ? (
                                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                              ) : (
                                <XCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                              )}
                            </button> */}
                            <button
                              onClick={() => {
                                if (
                                  confirm(
                                    "Tem certeza que deseja excluir este aluno?"
                                  )
                                ) {
                                  deleteStudent(student._id);
                                }
                              }}
                              className="p-2 sm:p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                              title="Excluir aluno"
                            >
                              <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredStudents.length === 0 && (
                    <div className="text-center py-12 sm:py-16">
                      {studentSearch || studentFilter !== "all" ? (
                        <>
                          <AlertCircle className="h-16 w-16 sm:h-20 sm:w-20 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
                            Nenhum aluno encontrado
                          </h3>
                          <p className="text-gray-500 text-sm sm:text-base">
                            Tente ajustar os filtros de busca
                          </p>
                        </>
                      ) : (
                        <>
                          <Users className="h-16 w-16 sm:h-20 sm:w-20 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
                            Nenhum aluno cadastrado
                          </h3>
                          <p className="text-gray-500 text-sm sm:text-base mb-4">
                            Adicione o primeiro aluno para começar
                          </p>
                          <button
                            onClick={() => setShowStudentModal(true)}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-2 font-semibold shadow-lg hover:shadow-xl mx-auto"
                          >
                            <UserPlus className="h-4 w-4" />
                            <span>Adicionar Primeiro Aluno</span>
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Class Editor Modal */}
      {showClassEditor && (
        <ClassEditor
          classData={editingClass}
          courseId={selectedCourseForClass}
          onSave={handleSaveClass}
          newClass={newClass}
          setNewClass={setNewClass}
          courses={courses}
          onCancel={() => {
            setShowClassEditor(false);
            setEditingClass(null);
            setSelectedCourseForClass("");
          }}
        />
      )}
    </div>
  );
}
