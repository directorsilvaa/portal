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
  ClipboardList,
  StarsIcon,
  AlertTriangle,
  Monitor,
  Play,
  Book,
  Check,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
// Modal Component
const AddStudentsModal = ({
  isOpen,
  onClose,
  allStudents,
  courseStudents,
  onAddStudents,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudents, setSelectedStudents] = useState(() => {
    return new Set(courseStudents.map((student) => student._id));
  });

  // Filtra os alunos baseado na busca
  const filteredStudents = allStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Verifica se um aluno já está inscrito no curso
  const isStudentEnrolled = (studentId) => {
    return courseStudents.some((student) => student._id === studentId);
  };

  // Toggle de seleção do aluno
  const toggleStudentSelection = (studentId) => {
    if (isStudentEnrolled(studentId)) {
      return;
    }

    const newSelection = new Set(selectedStudents);
    if (newSelection.has(studentId)) {
      newSelection.delete(studentId);
    } else {
      newSelection.add(studentId);
    }
    setSelectedStudents(newSelection);
  };

  // Função para salvar as alterações
  const handleSave = () => {
    const newStudentIds = Array.from(selectedStudents).filter(
      (studentId) => !isStudentEnrolled(studentId)
    );

    const newStudents = allStudents.filter((student) =>
      newStudentIds.includes(student._id)
    );

    onAddStudents(newStudents);
    onClose();
    setSearchTerm("");
  };

  // Conta quantos novos alunos foram selecionados
  const newStudentsCount = Array.from(selectedStudents).filter(
    (studentId) => !isStudentEnrolled(studentId)
  ).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Adicionar Alunos ao Curso
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Search */}
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar alunos por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Students List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-3">
            {filteredStudents.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Nenhum aluno encontrado</p>
              </div>
            ) : (
              filteredStudents.map((student) => {
                const isEnrolled = isStudentEnrolled(student._id);
                const isSelected = selectedStudents.has(student._id);

                return (
                  <div
                    key={student.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                      isEnrolled
                        ? "bg-green-50 border-green-200"
                        : isSelected
                        ? "bg-blue-50 border-blue-200"
                        : "bg-white border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleStudentSelection(student._id)}
                        disabled={isEnrolled}
                        className={`h-4 w-4 rounded border-gray-300 ${
                          isEnrolled
                            ? "text-green-600 focus:ring-green-500 cursor-not-allowed"
                            : "text-blue-600 focus:ring-blue-500 cursor-pointer"
                        }`}
                      />
                      {isEnrolled && (
                        <Check className="absolute -top-1 -right-1 h-3 w-3 text-green-600 bg-white rounded-full" />
                      )}
                    </div>

                    <div className="flex items-center space-x-3 flex-1">
                      <div
                        className={`p-2 rounded-full ${
                          isEnrolled ? "bg-green-100" : "bg-blue-100"
                        }`}
                      >
                        <User
                          className={`h-4 w-4 ${
                            isEnrolled ? "text-green-600" : "text-blue-600"
                          }`}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p
                          className={`font-medium ${
                            isEnrolled ? "text-green-900" : "text-gray-900"
                          }`}
                        >
                          {student.name}
                        </p>
                        <p
                          className={`text-sm ${
                            isEnrolled ? "text-green-600" : "text-gray-500"
                          }`}
                        >
                          {student.email}
                        </p>
                      </div>

                      {isEnrolled && (
                        <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">
                          Já inscrito
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            {newStudentsCount > 0 && (
              <span>
                {newStudentsCount} novo{newStudentsCount !== 1 ? "s" : ""} aluno
                {newStudentsCount !== 1 ? "s" : ""} selecionado
                {newStudentsCount !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={newStudentsCount === 0}
              className={`px-4 py-2 rounded-lg transition-colors ${
                newStudentsCount > 0
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Adicionar Alunos ({newStudentsCount})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default function AdminDashboard() {
  const { user, logout } = useAuth();

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

  const [isMonitoringOpen, setIsMonitoringOpen] = useState(false);
  const [monitoringTab, setMonitoringTab] = useState("students");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showAddStudentsModal, setShowAddStudentsModal] = useState(false);
  // Estados para formulários do monitoramento
  const [newEvaluation, setNewEvaluation] = useState({
    title: "",
    questions: "",
    duration: "",
    passingScore: "",
  });
  const [editingItem, setEditingItem] = useState(null);
  const [students, setStudents] = useState([]);
  const [classes, setLessons] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Estados necessários (adicionar no seu componente)
  const [evaluations, setEvaluations] = useState([
    // {
    //   id: 1,
    //   studentId: 1,
    //   studentName: "João Silva",
    //   evaluationDate: "2024-01-15",
    //   responseDate: "2024-01-20",
    //   grade: 8.5,
    //   questions: [
    //     {
    //       question: "Como você se sente durante as aulas?",
    //       answer: "Me sinto muito bem e motivado",
    //       type: "text",
    //     },
    //     {
    //       question: "Você está satisfeito com seu progresso?",
    //       answer: "sim",
    //       type: "yesno",
    //     },
    //     {
    //       question: "Tem dificuldades com os exercícios?",
    //       answer: "nao",
    //       type: "yesno",
    //     },
    //   ],
    // },
    // },
    // {
    //   id: 2,
    //   studentId: 2,
    //   studentName: "Maria Santos",
    //   evaluationDate: "2024-01-18",
    //   responseDate: null,
    //   grade: null,
    //   questions: [
    //     {
    //       question: "Como você se sente durante as aulas?",
    //       answer: "",
    //       type: "text",
    //     },
    //     {
    //       question: "Você gosta dos exercícios propostos?",
    //       answer: "",
    //       type: "yesno",
    //     },
    //   ],
    // },
    // {
    //   id: 3,
    //   studentId: 3,
    //   studentName: "Pedro Costa",
    //   evaluationDate: "2024-01-20",
    //   responseDate: "2024-01-22",
    //   grade: 9.2,
    //   questions: [
    //     {
    //       question: "Qual sua avaliação geral das aulas?",
    //       answer: "Excelente, muito dinâmicas e motivadoras",
    //       type: "text",
    //     },
    //     {
    //       question: "Recomendaria nossos serviços?",
    //       answer: "sim",
    //       type: "yesno",
    //     },
    //   ],
    // },
    // {
    //   id: 4,
    //   studentId: 4,
    //   studentName: "Ana Oliveira",
    //   evaluationDate: "2024-01-25",
    //   responseDate: "2024-01-28",
    //   grade: 6.8,
    //   questions: [
    //     {
    //       question: "Como foi sua experiência inicial?",
    //       answer: "Boa, mas ainda estou me adaptando",
    //       type: "text",
    //     },
    //     {
    //       question: "Precisa de acompanhamento extra?",
    //       answer: "sim",
    //       type: "yesno",
    //     },
    //   ],
    // },
  ]);

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

  // Função para buscar dados dos estudantes
  const fetchAvaliacoes = async () => {
    try {
      const token = localStorage.getItem("token"); // Recupera o token do local storage
      const response = await axios.get(
        "https://portal-backend-kvw9.onrender.com/api/avaliacoes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEvaluations(response.data?.data || []); // Armazena os dados dos estudantes
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
        fetchAvaliacoes(),
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
    setNewClass({
      ...newClass,
      courseId: cls?.course?._id,
    });
    setEditingClass(cls);
    setShowClassEditor(true);
  };

  const handleDeleteClass = async (classId: string) => {
    if (confirm("Tem certeza que deseja excluir esta aula?")) {
      // deleteClass(classId);
      const token = localStorage.getItem("token"); // Substitua "token" pela chave que você

      const response = await axios.delete(
        `https://portal-backend-kvw9.onrender.com/api/lessons/deletar-aula/${classId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
          },
        }
      );

      if (response?.data) {
        toast.success("Aula deletada com sucesso.");
        await fetchDataLesson();
      } else {
        toast.error("Erro ao deletar Aula.");
      }
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
        await fetchDataStudents();
      } else {
        toast.error("Erro ao deletar Aluno.");
      }
    } catch (error) {
      toast.error("Erro ao deletar Aluno.");
    }
  };

  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingEvaluation, setEditingEvaluation] = useState(null);
  const [deleteEvaluationId, setDeleteEvaluationId] = useState(null);

  const [evaluationForm, setEvaluationForm] = useState({
    studentId: "",
    cursoID: "",
    evaluationDate: "",
    responseDate: "",
    grade: "",
    questions: [{ question: "", answer: "", type: "text" }],
  });

  // Função para adicionar nova pergunta ao formulário
  const addQuestion = () => {
    setEvaluationForm({
      ...evaluationForm,
      questions: [
        ...evaluationForm.questions,
        { question: "", answer: "", type: "text" },
      ],
    });
  };

  // Função para remover pergunta do formulário
  const removeQuestion = (index) => {
    const newQuestions = evaluationForm.questions.filter((_, i) => i !== index);
    setEvaluationForm({
      ...evaluationForm,
      questions: newQuestions,
    });
  };

  // Função para atualizar pergunta específica
  const updateQuestion = (index, field, value) => {
    const newQuestions = [...evaluationForm.questions];

    // Se mudou o tipo de pergunta, limpar a resposta
    if (field === "type") {
      newQuestions[index] = {
        ...newQuestions[index],
        [field]: value,
        answer: "", // Limpar resposta quando mudar o tipo
      };
    } else {
      newQuestions[index][field] = value;
    }

    setEvaluationForm({
      ...evaluationForm,
      questions: newQuestions,
    });
  };

  // Função para lidar com edição de avaliação
  const handleEditEvaluation = (evaluation) => {
    setEditingEvaluation(evaluation);
    setEvaluationForm({
      studentId: evaluation.studentId.toString(),
      evaluationDate: evaluation.evaluationDate,
      responseDate: evaluation.responseDate || "",
      grade: evaluation.grade ? evaluation.grade.toString() : "",
      studentName: evaluation?.studentName,
      cursoID: evaluation?.cursoID,
      questions:
        evaluation.questions.length > 0
          ? evaluation.questions
          : [{ question: "", answer: "", type: "text" }],
    });
    setShowEvaluationModal(true);
  };

  // Função para lidar com exclusão de avaliação
  const handleDeleteEvaluation = (evaluationId) => {
    setDeleteEvaluationId(evaluationId);
    setShowDeleteModal(true);
  };

  // Função para confirmar exclusão
  const confirmDelete = async () => {
    setEvaluations(
      evaluations.filter((evaluation) => evaluation.id !== deleteEvaluationId)
    );
    setShowDeleteModal(false);
    setDeleteEvaluationId(null);

    const response = await axios.delete(
      `https://portal-backend-kvw9.onrender.com/api/avaliacoes/${deleteEvaluationId}`,
      {
        headers: {
          // Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
        },
      }
    );

    if (response?.data) {
      toast.success("Avaliação excluida da com sucesso.");
      await fetchAvaliacoes();
    } else {
      toast.error("Erro ao excluir.");
    }
  };

  // Função para lidar com submissão do formulário
  const handleEvaluationSubmit = async (e) => {
    e.preventDefault();

    // Validação básica
    if (!evaluationForm.studentId) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Validar nota se preenchida
    if (
      evaluationForm.grade &&
      (parseFloat(evaluationForm.grade) < 0 ||
        parseFloat(evaluationForm.grade) > 10)
    ) {
      alert("A nota deve estar entre 0 e 10.");
      return;
    }

    // Verificar se pelo menos uma pergunta foi preenchida
    const hasValidQuestion = evaluationForm.questions.some(
      (q) => q.question.trim() !== ""
    );
    if (!hasValidQuestion) {
      toast.warning("Por favor, adicione pelo menos uma pergunta.");
      return;
    }

    // Encontrar o nome do estudante
    const selectedStudent = students.find(
      (s) => s._id.toString() === evaluationForm.studentId
    );

    try {
      if (editingEvaluation) {
        const newEvaluation = {
          // id: Date.now(), // Em um app real, isso viria do backend
          studentId: evaluationForm.studentId,
          studentName: selectedStudent.name,
          cursoID: evaluationForm.cursoID,
          evaluationDate: evaluationForm.evaluationDate,
          responseDate: evaluationForm.responseDate || null,
          grade: evaluationForm.grade ? parseFloat(evaluationForm.grade) : null,
          questions: evaluationForm.questions.filter(
            (q) => q.question.trim() !== ""
          ),
        };
        // Atualizar avaliação existente
        const responsePut = await axios.put(
          `https://portal-backend-kvw9.onrender.com/api/avaliacoes/${editingEvaluation?._id}`,
          {
            ...newEvaluation,
          },
          {
            headers: {
              // Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
            },
          }
        );
        if (responsePut?.data) {
          toast.success("Nova avaliação atualizada com sucesso!");
          setShowEvaluationModal(false);
          setEditingEvaluation(null);
          setEvaluationForm({
            studentId: "",
            evaluationDate: "",
            responseDate: "",
            grade: "",
            cursoID: "",
            questions: [{ question: "", answer: "", type: "text" }],
          });
          await fetchAvaliacoes();
        }
        console.log("Avaliação atualizada com sucesso!");
      } else {
        // Criar nova avaliação
        const newEvaluation = {
          // id: Date.now(), // Em um app real, isso viria do backend
          studentId: evaluationForm.studentId,
          studentName: selectedStudent.name,
          cursoID: evaluationForm.cursoID,
          evaluationDate: evaluationForm.evaluationDate,
          responseDate: evaluationForm.responseDate || null,
          grade: evaluationForm.grade ? parseFloat(evaluationForm.grade) : null,
          questions: evaluationForm.questions.filter(
            (q) => q.question.trim() !== ""
          ),
        };

        const response = await axios.post(
          "https://portal-backend-kvw9.onrender.com/api/avaliacoes",
          {
            ...newEvaluation,
          },
          {
            headers: {
              // Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
            },
          }
        );
        if (response?.data) {
          toast.success("Nova avaliação criada com sucesso!");
          setShowEvaluationModal(false);
          setEditingEvaluation(null);
          setEvaluationForm({
            studentId: "",
            evaluationDate: "",
            responseDate: "",
            grade: "",
            cursoID: "",
            questions: [{ question: "", answer: "", type: "text" }],
          });
          await fetchAvaliacoes();
        }
      }
    } catch (error) {
      toast.error("Erro ao criar Avaliação");
      // Fechar modal e resetar formulário
      setShowEvaluationModal(false);
      setEditingEvaluation(null);
      setEvaluationForm({
        studentId: "",
        evaluationDate: "",
        responseDate: "",
        grade: "",
        cursoID: "",
        questions: [{ question: "", answer: "", type: "text" }],
      });
    }
  };

  const openMonitoring = (course) => {
    setSelectedCourse(course);
    setIsMonitoringOpen(true);
    setMonitoringTab("students");
  };
  const closeMonitoring = () => {
    setIsMonitoringOpen(false);
    setSelectedCourse(null);
    setEditingItem(null);
  };

  // Filtros para o curso selecionado
  const courseStudents = students?.filter(
    (s) =>
      Array.isArray(s.courseAccess) &&
      s.courseAccess.includes(selectedCourse?._id)
  );

  console.log(courseStudents)

  const courseEvaluations = evaluations?.filter(
    (e) => e.cursoID === selectedCourse?._id
  );
  const courseClassesList = classes?.filter(
    (c) => c?.course?._id === selectedCourse?._id
  );

  const tabButtons = [
    { id: "overview", label: "Dashboard", icon: BarChart3 },
    { id: "courses", label: "Cursos", icon: BookOpen },
    // { id: "classes", label: "Aulas", icon: Video },
    // { id: "announcements", label: "Avaliações", icon: Bell },
    { id: "students", label: "Solicitações Inscrições", icon: Users },
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

                <div className="bg-[#003b5f] rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm font-medium">
                        Todas as Avaliações
                      </p>
                      <p className="text-3xl font-bold">
                        {evaluations?.length}
                      </p>
                    </div>
                    <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                      <StarsIcon className="h-8 w-8" />
                    </div>
                  </div>
                </div>
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

                  {/* <button
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
                      Nova avaliação
                    </h3>
                    <p className="text-sm text-gray-600">Publicar Avaliação</p>
                  </button> */}
                  <button
                    onClick={() => setActiveTab("announcements")}
                    className="p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-200 hover:shadow-lg transition-all duration-300 group"
                  >
                    <Bell className="h-8 w-8 text-orange-600 mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Nova avaliação
                    </h3>
                    <p className="text-sm text-gray-600">Publicar Avaliação</p>
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
                              onClick={() => openMonitoring(course)}
                              className="flex-1 bg-green-50 text-green-600 hover:bg-green-100 py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 font-medium"
                              title="Monitorar"
                            >
                              <Monitor className="h-4 w-4" />
                              <span className="hidden sm:inline">Monitor</span>
                            </button>
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

          {/* Modal de Monitoramento */}
          {isMonitoringOpen && selectedCourse && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
                {/* Header do Modal */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                      <Monitor className="h-6 w-6 text-blue-600" />
                      <span>Monitoramento - {selectedCourse.name}</span>
                    </h2>
                    <p className="text-gray-600 mt-1">
                      Gerencie alunos, avaliações e aulas
                    </p>
                  </div>
                  <button
                    onClick={closeMonitoring}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="h-6 w-6 text-gray-500" />
                  </button>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6">
                    <button
                      onClick={() => setMonitoringTab("students")}
                      className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                        monitoringTab === "students"
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <Users className="h-4 w-4" />
                      <span>Alunos ({courseStudents.length})</span>
                    </button>
                    <button
                      onClick={() => setMonitoringTab("evaluations")}
                      className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                        monitoringTab === "evaluations"
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <Award className="h-4 w-4" />
                      <span>Avaliações ({courseEvaluations.length})</span>
                    </button>
                    <button
                      onClick={() => setMonitoringTab("classes")}
                      className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                        monitoringTab === "classes"
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <Video className="h-4 w-4" />
                      <span>Aulas ({courseClassesList.length})</span>
                    </button>
                  </nav>
                </div>

                {/* Conteúdo das Tabs */}
                <div className="p-6">
                  {/* Tab Alunos */}
                  {monitoringTab === "students" && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Alunos Inscritos
                        </h3>
                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={() => setShowAddStudentsModal(true)}
                            // onClick={editingItem ? updateStudent : addStudent}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                          >
                            <Plus className="h-4 w-4" />
                            <span>
                              {editingItem ? "Atualizar" : "Adicionar Alunos"}
                            </span>
                          </button>
                        </div>
                      </div>

                      {/* Lista de alunos */}
                      <div className="space-y-4">
                        {courseStudents.length === 0 ? (
                          <div className="text-center py-8 text-gray-500">
                            <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                            <p>Nenhum aluno inscrito neste curso</p>
                          </div>
                        ) : (
                          courseStudents.map((student) => (
                            <div
                              key={student.id}
                              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div className="bg-blue-100 p-2 rounded-full">
                                    <User className="h-5 w-5 text-blue-600" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-900">
                                      {student.name}
                                    </h4>
                                    <p className="text-sm text-gray-500 flex items-center space-x-2">
                                      <Mail className="h-4 w-4" />
                                      <span>{student.email}</span>
                                    </p>
                                    <p className="text-xs text-gray-400 flex items-center space-x-2 mt-1">
                                      <Calendar className="h-4 w-4" />
                                      <span>
                                        Inscrito em:{" "}
                                        {new Date(
                                          student.createdAt
                                        ).toLocaleDateString("pt-BR")}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() => deleteStudent(student.id)}
                                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                      title="Remover"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  {/* Tab Avaliações */}
                  {monitoringTab === "evaluations" && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Avaliações do Curso
                        </h3>
                        <button
                          // onClick={
                          //   editingItem ? updateEvaluation : addEvaluation
                          // }
                          onClick={() => {
                            setShowEvaluationModal(true);
                            setEditingEvaluation(null);
                            setEvaluationForm({
                              studentId: "",
                              evaluationDate: "",
                              responseDate: "",
                              grade: "",
                              cursoID: selectedCourse?._id,
                              questions: [
                                { question: "", answer: "", type: "text" },
                              ],
                            });
                          }}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                        >
                          <Plus className="h-4 w-4" />
                          <span>{editingItem ? "Atualizar" : "Adicionar"}</span>
                        </button>
                      </div>

                      {/* Lista de avaliações */}
                      <div className="space-y-4">
                        {courseEvaluations.length === 0 ? (
                          <div className="text-center py-8 text-gray-500">
                            <Award className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                            <p>Nenhuma avaliação criada para este curso</p>
                          </div>
                        ) : (
                          courseEvaluations.map((evaluation) => (
                            <div
                              key={evaluation._id}
                              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div className="bg-green-100 p-2 rounded-full">
                                    <Award className="h-5 w-5 text-green-600" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-900">
                                      Aluno: {evaluation.studentName}
                                    </h4>
                                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                      <span className="flex items-center space-x-1">
                                        <FileText className="h-4 w-4" />
                                        <span>
                                          {evaluation.questions?.length}{" "}
                                          questões
                                        </span>
                                      </span>
                                      {/* <span className="flex items-center space-x-1">
                                        <Clock className="h-4 w-4" />
                                        <span>{evaluation.duration}</span>
                                      </span> */}
                                      <span className="flex items-center space-x-1">
                                        <Star className="h-4 w-4 text-yellow-400" />
                                        <span className="font-semibold">
                                          Nota: {evaluation.grade || "Sem Nota"}
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() =>
                                      handleEditEvaluation(evaluation)
                                    }
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Editar"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDeleteEvaluation(evaluation._id)
                                    }
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Excluir"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  {/* Tab Aulas */}
                  {monitoringTab === "classes" && (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Aulas do Curso
                        </h3>
                        <button
                          onClick={openCreateModalAulas}
                          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                        >
                          <Plus className="h-4 w-4" />
                          <span>{editingItem ? "Atualizar" : "Adicionar"}</span>
                        </button>
                      </div>

                      {/* Lista de aulas */}
                      <div className="space-y-4">
                        {courseClassesList.length === 0 ? (
                          <div className="text-center py-8 text-gray-500">
                            <Video className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                            <p>Nenhuma aula criada para este curso</p>
                          </div>
                        ) : (
                          courseClassesList
                            .sort((a, b) => a.order - b.order)
                            .map((classItem, index) => (
                              <div
                                key={classItem._id}
                                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-4">
                                    <div className="bg-purple-100 p-2 rounded-full">
                                      <Video className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <div>
                                      <div className="flex items-center space-x-2">
                                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                                          Aula {index + 1}
                                        </span>
                                        <h4 className="font-medium text-gray-900">
                                          {classItem.title}
                                        </h4>
                                      </div>
                                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                        {/* <span className="flex items-center space-x-1">
                                          <Clock className="h-4 w-4" />
                                          <span>{classItem.duration}</span>
                                        </span> */}
                                        {classItem.videoUrl ? (
                                          <span className="flex items-center space-x-1">
                                            <Play className="h-4 w-4" />
                                            <span>Vídeo disponível</span>
                                          </span>
                                        ) : (
                                          <span className="flex items-center space-x-1">
                                            <Book className="h-4 w-4" />
                                            <span>Aula Disponível</span>
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex space-x-2">
                                    <button
                                      // onClick={() => editClass(classItem)}
                                      onClick={() => handleEditClass(classItem)}
                                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                      title="Editar"
                                    >
                                      <Edit className="h-4 w-4" />
                                    </button>
                                    <button
                                      // onClick={() => deleteClass(classItem.id)}
                                      onClick={() =>
                                        handleDeleteClass(classItem._id)
                                      }
                                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                      title="Excluir"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer do Modal */}
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <div className="flex space-x-6">
                      <span className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>{courseStudents.length} alunos</span>
                      </span>
                      <span className="flex items-center space-x-2">
                        <Award className="h-4 w-4" />
                        <span>{courseEvaluations.length} avaliações</span>
                      </span>
                      <span className="flex items-center space-x-2">
                        <Video className="h-4 w-4" />
                        <span>{courseClassesList.length} aulas</span>
                      </span>
                    </div>
                    <button
                      onClick={closeMonitoring}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Fechar
                    </button>
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

          {activeTab === "announcements" && (
            <div className="space-y-8">
              {/* Header com botão para nova avaliação */}
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Avaliações</h1>
                <button
                  onClick={() => {
                    setShowEvaluationModal(true);
                    setEditingEvaluation(null);
                    setEvaluationForm({
                      studentId: "",
                      evaluationDate: "",
                      responseDate: "",
                      grade: "",
                      cursoID: "",
                      questions: [{ question: "", answer: "", type: "text" }],
                    });
                  }}
                  className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-6 rounded-xl hover:from-orange-700 hover:to-red-700 transition-all duration-300 flex items-center space-x-2 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Plus className="h-5 w-5" />
                  <span>Nova Avaliação</span>
                </button>
              </div>

              {/* Lista de Avaliações */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Lista de Avaliações
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Nome do Aluno
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Nota
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Data da Avaliação
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Data de Resposta
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Status
                        </th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {evaluations.map((evaluation) => (
                        <tr
                          key={evaluation.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                {evaluation.studentName.charAt(0)}
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">
                                  {evaluation.studentName}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <div
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${
                                  evaluation.grade >= 8
                                    ? "bg-green-100 text-green-800"
                                    : evaluation.grade >= 6
                                    ? "bg-yellow-100 text-yellow-800"
                                    : evaluation.grade >= 4
                                    ? "bg-orange-100 text-orange-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {evaluation.grade
                                  ? evaluation.grade.toFixed(1)
                                  : "-"}
                              </div>
                              {evaluation.grade && (
                                <span className="text-xs text-gray-500">
                                  / 10
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {new Date(
                              evaluation.evaluationDate
                            ).toLocaleDateString("pt-BR")}
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {evaluation.responseDate
                              ? new Date(
                                  evaluation.responseDate
                                ).toLocaleDateString("pt-BR")
                              : "-"}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                evaluation.responseDate
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {evaluation.responseDate
                                ? "Respondida"
                                : "Pendente"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() => handleEditEvaluation(evaluation)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Editar Avaliação"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteEvaluation(evaluation._id)
                                }
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Excluir Avaliação"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {evaluations.length === 0 && (
                    <div className="text-center py-16">
                      <ClipboardList className="h-20 w-20 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">
                        Nenhuma avaliação cadastrada
                      </h3>
                      <p className="text-gray-500">
                        Crie a primeira avaliação para seus alunos
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Modal de Criar/Editar Avaliação */}
          {showEvaluationModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {editingEvaluation
                        ? "Editar Avaliação"
                        : "Nova Avaliação"}
                    </h3>
                    <button
                      onClick={() => {
                        setShowEvaluationModal(false);
                        setEditingEvaluation(null);
                      }}
                      className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                <form
                  onSubmit={handleEvaluationSubmit}
                  className="p-6 space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    {/* Seleção do Aluno */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Aluno *
                      </label>
                      <select
                        value={evaluationForm.studentId}
                        onChange={(e) =>
                          setEvaluationForm({
                            ...evaluationForm,
                            studentId: e.target.value,
                          })
                        }
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      >
                        <option value="">Selecione um aluno</option>
                        {students.map((student) => (
                          <option key={student._id} value={student._id}>
                            {student.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Curso *
                      </label>
                      <select
                        value={evaluationForm.cursoID}
                        onChange={(e) =>
                          setEvaluationForm({
                            ...evaluationForm,
                            cursoID: e.target.value,
                          })
                        }
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      >
                        <option value="">Selecione um Curso</option>
                        {courses.map((student) => (
                          <option key={student._id} value={student._id}>
                            {student.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Data da Avaliação */}
                    {/* <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Data da Avaliação *
                          </label>
                          <input
                            type="date"
                            value={evaluationForm.evaluationDate}
                            onChange={(e) =>
                              setEvaluationForm({
                                ...evaluationForm,
                                evaluationDate: e.target.value,
                              })
                            }
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                          />
                        </div> */}

                    {editingEvaluation && (
                      <>
                        {/* Data de Resposta */}
                        {/* <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Data de Resposta
                              </label>
                              <input
                                type="date"
                                value={evaluationForm.responseDate}
                                onChange={(e) =>
                                  setEvaluationForm({
                                    ...evaluationForm,
                                    responseDate: e.target.value,
                                  })
                                }
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                              />
                            </div> */}

                        {/* Nota do Aluno */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Nota (0-10)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="10"
                            step="0.1"
                            value={evaluationForm.grade}
                            onChange={(e) =>
                              setEvaluationForm({
                                ...evaluationForm,
                                grade: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            placeholder="Ex: 8.5"
                          />
                        </div>
                      </>
                    )}

                    {/* Perguntas Dinâmicas */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <label className="block text-sm font-semibold text-gray-700">
                          Perguntas da Avaliação *
                        </label>
                        <button
                          type="button"
                          onClick={addQuestion}
                          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                        >
                          <Plus className="h-4 w-4" />
                          <span>Adicionar Pergunta</span>
                        </button>
                      </div>

                      <div className="space-y-4">
                        {evaluationForm.questions.map((item, index) => (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-xl p-4"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold text-gray-900">
                                Pergunta {index + 1}
                              </h4>
                              {evaluationForm.questions.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeQuestion(index)}
                                  className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              )}
                            </div>

                            <div className="space-y-3">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Pergunta
                                </label>
                                <input
                                  type="text"
                                  value={item.question}
                                  onChange={(e) =>
                                    updateQuestion(
                                      index,
                                      "question",
                                      e.target.value
                                    )
                                  }
                                  required
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                  placeholder="Digite a pergunta..."
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Tipo de Resposta
                                </label>
                                <select
                                  value={item.type}
                                  onChange={(e) =>
                                    updateQuestion(
                                      index,
                                      "type",
                                      e.target.value
                                    )
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                >
                                  <option value="text">Resposta Escrita</option>
                                  <option value="yesno">Sim ou Não</option>
                                </select>
                              </div>

                              {editingEvaluation && (
                                <>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Resposta do{" "}
                                      <span className="text-yellow-700 font-bold">
                                        Aluno {evaluationForm?.studentName}
                                      </span>
                                    </label>
                                    {item.type === "yesno" ? (
                                      <select
                                        value={item.answer}
                                        onChange={(e) =>
                                          updateQuestion(
                                            index,
                                            "answer",
                                            e.target.value
                                          )
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                      >
                                        <option value="">
                                          Selecione uma resposta
                                        </option>
                                        <option value="sim">Sim</option>
                                        <option value="nao">Não</option>
                                      </select>
                                    ) : (
                                      <textarea
                                        value={item.answer}
                                        onChange={(e) =>
                                          updateQuestion(
                                            index,
                                            "answer",
                                            e.target.value
                                          )
                                        }
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                        placeholder="Digite a resposta (opcional)..."
                                      />
                                    )}
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Botões de Ação */}
                  <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => {
                        setShowEvaluationModal(false);
                        setEditingEvaluation(null);
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
                      <span>
                        {editingEvaluation ? "Atualizar" : "Salvar"} Avaliação
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Modal de Confirmação de Exclusão */}
          {showDeleteModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
                <div className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                    Confirmar Exclusão
                  </h3>
                  <p className="text-gray-600 text-center mb-6">
                    Tem certeza que deseja excluir esta avaliação? Esta ação não
                    pode ser desfeita.
                  </p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={confirmDelete}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-semibold"
                    >
                      Excluir
                    </button>
                  </div>
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
      {/* Modal de Adicionar Alunos */}
      <AddStudentsModal
        isOpen={showAddStudentsModal}
        onClose={() => setShowAddStudentsModal(false)}
        allStudents={students}
        courseStudents={courseStudents}
        onAddStudents={handleAddStudent}
      />
    </div>
  );
}
