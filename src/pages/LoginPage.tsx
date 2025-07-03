import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  GraduationCap, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  Sparkles,
  Shield,
  Users,
  Award
} from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(email, password);
    
    if (success) {
      navigate('/student');
    } else {
      setError('Email ou senha incorretos');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-3 text-white hover:text-gray-200 transition-colors group">
            <div className="p-3 bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl border border-white border-opacity-20 group-hover:bg-opacity-30 transition-all duration-300">
              <GraduationCap className="h-10 w-10" />
            </div>
            <div className="text-left">
              <span className="text-3xl font-bold block">Instituto Ágora</span>
              <span className="text-sm text-gray-300">Educação Premium</span>
            </div>
          </Link>
          
          <div className="mt-8">
            <div className="inline-flex items-center px-4 py-2 bg-white bg-opacity-10 backdrop-blur-sm rounded-full text-sm font-medium mb-4 border border-white border-opacity-20">
              <Sparkles className="h-4 w-4 mr-2" />
              Portal do Aluno
            </div>
            <h1 className="text-4xl font-bold text-white mb-3">
              Bem-vindo de volta!
            </h1>
            <p className="text-gray-200 text-lg">
              Acesse sua conta para continuar aprendendo
            </p>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white border-opacity-20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500 bg-opacity-20 border border-red-400 border-opacity-30 rounded-2xl p-4 flex items-center space-x-3 backdrop-blur-sm">
                <AlertCircle className="h-5 w-5 text-red-300 flex-shrink-0" />
                <span className="text-red-200">{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-white mb-3">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-300" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-white placeholder-gray-300"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-white mb-3">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-300" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-14 py-4 bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-white placeholder-gray-300"
                  placeholder="Sua senha"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-xl hover:shadow-2xl"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Entrando...</span>
                </div>
              ) : (
                'Entrar na Plataforma'
              )}
            </button>
          </form>

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="text-white">
              <Shield className="h-6 w-6 mx-auto mb-2 text-blue-300" />
              <div className="text-xs font-medium">Seguro</div>
            </div>
            <div className="text-white">
              <Users className="h-6 w-6 mx-auto mb-2 text-purple-300" />
              <div className="text-xs font-medium">Comunidade</div>
            </div>
            <div className="text-white">
              <Award className="h-6 w-6 mx-auto mb-2 text-pink-300" />
              <div className="text-xs font-medium">Certificado</div>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="mt-8 p-6 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl border border-white border-opacity-20">
            <h3 className="font-semibold text-white mb-4 text-center">Contas de Demonstração</h3>
            <div className="space-y-3 text-sm text-gray-200">
              <div className="p-3 bg-white bg-opacity-10 rounded-xl">
                <div className="font-medium text-blue-300">👨‍💼 Admin</div>
                <div>admin@institutoagora.com</div>
                <div>Senha: 123456</div>
              </div>
              <div className="p-3 bg-white bg-opacity-10 rounded-xl">
                <div className="font-medium text-green-300">👨‍🎓 Aluno (com acesso)</div>
                <div>joao@email.com</div>
                <div>Senha: 123456</div>
              </div>
              <div className="p-3 bg-white bg-opacity-10 rounded-xl">
                <div className="font-medium text-orange-300">👩‍🎓 Aluno (sem acesso)</div>
                <div>maria@email.com</div>
                <div>Senha: 123456</div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link 
              to="/" 
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              ← Voltar para o site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}