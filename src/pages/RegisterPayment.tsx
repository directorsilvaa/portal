import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Shield,
  Users,
  User,
  BookOpen,
} from "lucide-react";
import Logo from "../assets/logo.png";
import axios from "axios";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [course, setCourse] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const [courseId, setCourseId] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("courseId");
    setCourseId(id);
    setCourse(id || ""); // Define course como courseId se existir
  }, [location]);

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar dados dos cursos
  const fetchDataCourse = async () => {
    try {
      const response = await axios.get(
        "https://portal-backend-kvw9.onrender.com/api/courses",
        {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
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
      await Promise.all([fetchDataCourse()]);
      setLoading(false); // Finaliza o carregamento
    };

    fetchData();
  }, []); // Executa apenas uma vez quando o componente é montado

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validações básicas
    if (!email || !name || !password || !course) {
      toast.error("Todos os campos são obrigatórios");
      setError("Todos os campos são obrigatórios");
      return;
    }

    if (password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    const success = await register(email, name, password, course, telefone, cidade, estado);

    if (success) {
      toast.success("Registrado com sucesso.");
      navigate("/student");
    } else {
      toast.error("Erro ao criar conta. Verifique os dados e tente novamente.");
      setError("Erro ao criar conta. Verifique os dados e tente novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="relative max-w-md w-full">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <img src={Logo} alt="logo" className="h-18 w-full text-gray-800" />
          </Link>

          <div className="mt-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-3">
              Criar Conta de Aluno
            </h1>
            <p className="text-gray-600 text-lg">
              Preencha os dados para começar sua jornada de aprendizado
            </p>
          </div>
        </div>

        {/* Register Form */}
        <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                <span className="text-red-700">{error}</span>
              </div>
            )}

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-3"
              >
                Nome Completo
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-800 placeholder-gray-400"
                  placeholder="Seu nome completo"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-3"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-800 placeholder-gray-400"
                  placeholder="seu@email.com"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="telefone"
                className="block text-sm font-semibold text-gray-700 mb-3"
              >
                Telefone
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="email"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-800 placeholder-gray-400"
                  placeholder="(DD) XXXX-XXXX"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="estado"
                className="block text-sm font-semibold text-gray-700 mb-3"
              >
                Estado
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="estado"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-800 placeholder-gray-400"
                  placeholder="Estado"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="cidade"
                className="block text-sm font-semibold text-gray-700 mb-3"
              >
                Cidade
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="cidade"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-800 placeholder-gray-400"
                  placeholder="Minha Cidade"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="course"
                className="block text-sm font-semibold text-gray-700 mb-3"
              >
                Curso
              </label>
              <div className="relative">
                <BookOpen className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  id="course"
                  value={course || courseId || ""}
                  onChange={(e) => setCourse(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-800 appearance-none cursor-pointer"
                >
                  <option value="">Selecione seu curso</option>
                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-3"
              >
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-14 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-800 placeholder-gray-400"
                  placeholder="Mínimo 6 caracteres"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#003b5f] text-white py-4 px-6 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-xl hover:shadow-2xl"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Criando conta...</span>
                </div>
              ) : (
                "Criar Conta de Aluno"
              )}
            </button>
          </form>

          {/* Features */}
          {/* <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="text-gray-700">
              <Shield className="h-6 w-6 mx-auto mb-2 text-green-500" />
              <div className="text-xs font-medium">Seguro</div>
            </div>
            <div className="text-gray-700">
              <Users className="h-6 w-6 mx-auto mb-2 text-blue-500" />
              <div className="text-xs font-medium">Comunidade</div>
            </div>
            <div className="text-gray-700">
              <BookOpen className="h-6 w-6 mx-auto mb-2 text-purple-500" />
              <div className="text-xs font-medium">Aprendizado</div>
            </div>
          </div> */}

          <div className="mt-6 text-center space-y-2">
            <div>
              <span className="text-gray-500 text-sm">Já tem uma conta? </span>
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium"
              >
                Fazer login
              </Link>
            </div>
            <Link
              to="/"
              className="text-gray-500 hover:text-gray-700 transition-colors text-sm font-medium block"
            >
              ← Voltar para o site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
