import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import Header from '../components/Header';
import ClassEditor from '../components/ClassEditor';
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
  AlertCircle
} from 'lucide-react';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const { 
    courses, 
    classes, 
    announcements, 
    students, 
    addCourse, 
    addClass, 
    updateClass,
    deleteClass,
    addAnnouncement, 
    addStudent, 
    updateStudent,
    deleteStudent,
    updateStudentCourseAccess
  } = useData();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [showClassEditor, setShowClassEditor] = useState(false);
  const [editingClass, setEditingClass] = useState<any>(null);
  const [selectedCourseForClass, setSelectedCourseForClass] = useState('');
  
  // Search and filter states
  const [studentSearch, setStudentSearch] = useState('');
  const [studentFilter, setStudentFilter] = useState('all'); // all, active, inactive
  
  // Announcement editing states
  const [editingAnnouncement, setEditingAnnouncement] = useState<any>(null);
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);

  // Form states
  const [newCourse, setNewCourse] = useState({ name: '', description: '', icon: 'BookOpen' });
  const [announcementForm, setAnnouncementForm] = useState({ title: '', content: '' });
  const [newStudent, setNewStudent] = useState({ 
    name: '', 
    email: '', 
    password: '',
    role: 'student' as const, 
    canAccessClasses: true,
    courseAccess: [] as string[]
  });

  // Filter students based on search and filter
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
                         student.email.toLowerCase().includes(studentSearch.toLowerCase());
    
    const matchesFilter = studentFilter === 'all' || 
                         (studentFilter === 'active' && student.canAccessClasses) ||
                         (studentFilter === 'inactive' && !student.canAccessClasses);
    
    return matchesSearch && matchesFilter;
  });

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    addCourse(newCourse);
    setNewCourse({ name: '', description: '', icon: 'BookOpen' });
  };

  const handleAnnouncementSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAnnouncement) {
      // In a real app, you'd have an updateAnnouncement function
      console.log('Update announcement:', editingAnnouncement.id, announcementForm);
    } else {
      addAnnouncement(announcementForm);
    }
    setAnnouncementForm({ title: '', content: '' });
    setEditingAnnouncement(null);
    setShowAnnouncementForm(false);
  };

  const handleEditAnnouncement = (announcement: any) => {
    setEditingAnnouncement(announcement);
    setAnnouncementForm({ title: announcement.title, content: announcement.content });
    setShowAnnouncementForm(true);
  };

  const handleDeleteAnnouncement = (announcementId: string) => {
    if (confirm('Tem certeza que deseja excluir este aviso?')) {
      // In a real app, you'd have a deleteAnnouncement function
      console.log('Delete announcement:', announcementId);
    }
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    addStudent(newStudent);
    setNewStudent({ 
      name: '', 
      email: '', 
      password: '',
      role: 'student', 
      canAccessClasses: true,
      courseAccess: []
    });
  };

  const handleSaveClass = (classData: any) => {
    if (editingClass) {
      updateClass(editingClass.id, classData);
    } else {
      addClass({ ...classData, courseId: selectedCourseForClass });
    }
    setShowClassEditor(false);
    setEditingClass(null);
    setSelectedCourseForClass('');
  };

  const handleEditClass = (cls: any) => {
    setEditingClass(cls);
    setShowClassEditor(true);
  };

  const handleDeleteClass = (classId: string) => {
    if (confirm('Tem certeza que deseja excluir esta aula?')) {
      deleteClass(classId);
    }
  };

  const handleDeleteStudent = (studentId: string) => {
    if (confirm('Tem certeza que deseja excluir este aluno?')) {
      deleteStudent(studentId);
    }
  };

  const toggleStudentAccess = (studentId: string, currentAccess: boolean) => {
    updateStudent(studentId, { canAccessClasses: !currentAccess });
  };

  const handleStudentCourseAccessChange = (studentId: string, courseId: string, checked: boolean) => {
    updateStudentCourseAccess(studentId, courseId, checked);
  };

  const tabButtons = [
    { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
    { id: 'courses', label: 'Cursos', icon: BookOpen },
    { id: 'classes', label: 'Aulas', icon: Video },
    { id: 'announcements', label: 'Avisos', icon: Bell },
    { id: 'students', label: 'Alunos', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Admin Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Painel Administrativo 🛠️
              </h1>
              <p className="text-purple-100">
                Bem-vindo, {user?.name}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 rounded-full p-3">
                <Settings className="h-8 w-8" />
              </div>
              <button
                onClick={logout}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabButtons.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
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
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <BookOpen className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total de Cursos</p>
                    <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Video className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total de Aulas</p>
                    <p className="text-2xl font-bold text-gray-900">{classes.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total de Alunos</p>
                    <p className="text-2xl font-bold text-gray-900">{students.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Bell className="h-8 w-8 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Avisos Ativos</p>
                    <p className="text-2xl font-bold text-gray-900">{announcements.length}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Adicionar Novo Curso</h2>
                <form onSubmit={handleAddCourse} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Curso</label>
                    <input
                      type="text"
                      value={newCourse.name}
                      onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Ex: Desenvolvimento Web Completo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                    <textarea
                      value={newCourse.description}
                      onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                      required
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Descreva o que o aluno aprenderá neste curso..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ícone</label>
                    <select
                      value={newCourse.icon}
                      onChange={(e) => setNewCourse({ ...newCourse, icon: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    >
                      <option value="BookOpen">📚 Livro</option>
                      <option value="Code">💻 Código</option>
                      <option value="Megaphone">📢 Marketing</option>
                      <option value="Palette">🎨 Design</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2 font-medium"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Adicionar Curso</span>
                  </button>
                </form>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Cursos Cadastrados</h2>
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h3 className="font-semibold text-gray-900">{course.name}</h3>
                      <p className="text-gray-600 text-sm mt-1">{course.description}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                          {classes.filter(c => c.courseId === course.id).length} aulas
                        </span>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Classes Tab */}
          {activeTab === 'classes' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Gerenciar Aulas</h2>
                  <div className="flex items-center space-x-4">
                    <select
                      value={selectedCourseForClass}
                      onChange={(e) => setSelectedCourseForClass(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Selecione um curso</option>
                      {courses.map((course) => (
                        <option key={course.id} value={course.id}>{course.name}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => {
                        if (!selectedCourseForClass) {
                          alert('Selecione um curso primeiro');
                          return;
                        }
                        setShowClassEditor(true);
                      }}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Nova Aula</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {classes.map((cls) => {
                    const course = courses.find(c => c.id === cls.courseId);
                    return (
                      <div key={cls.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              {cls.type === 'video' ? (
                                <Video className="h-4 w-4 text-blue-600" />
                              ) : (
                                <FileText className="h-4 w-4 text-green-600" />
                              )}
                              <h3 className="font-semibold text-gray-900">{cls.title}</h3>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                cls.type === 'video' 
                                  ? 'bg-blue-100 text-blue-800' 
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {cls.type === 'video' ? 'Vídeo' : 'Texto'}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">{cls.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center space-x-1">
                                <BookOpen className="h-3 w-3" />
                                <span>{course?.name}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span>{cls.createdAt.toLocaleDateString()}</span>
                              </span>
                              {cls.updatedAt && (
                                <span className="text-orange-600">Atualizado: {cls.updatedAt.toLocaleDateString()}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
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
                      </div>
                    );
                  })}
                  
                  {classes.length === 0 && (
                    <div className="text-center py-12">
                      <Video className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">Nenhuma aula cadastrada</h3>
                      <p className="text-gray-500">Comece criando sua primeira aula</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Announcements Tab */}
          {activeTab === 'announcements' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    {editingAnnouncement ? 'Editar Aviso' : 'Adicionar Novo Aviso'}
                  </h2>
                  {editingAnnouncement && (
                    <button
                      onClick={() => {
                        setEditingAnnouncement(null);
                        setAnnouncementForm({ title: '', content: '' });
                        setShowAnnouncementForm(false);
                      }}
                      className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {(showAnnouncementForm || !editingAnnouncement) && (
                  <form onSubmit={handleAnnouncementSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Título do Aviso</label>
                      <input
                        type="text"
                        value={announcementForm.title}
                        onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="Ex: Nova turma disponível"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Conteúdo</label>
                      <textarea
                        value={announcementForm.content}
                        onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })}
                        required
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="Digite o conteúdo do aviso..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2 font-medium"
                    >
                      <Save className="h-4 w-4" />
                      <span>{editingAnnouncement ? 'Atualizar Aviso' : 'Adicionar Aviso'}</span>
                    </button>
                  </form>
                )}
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Avisos Publicados</h2>
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <div key={announcement.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{announcement.title}</h3>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditAnnouncement(announcement)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="Editar"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteAnnouncement(announcement.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Excluir"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{announcement.content}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-gray-500 text-xs flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{announcement.createdAt.toLocaleDateString()}</span>
                        </p>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          Ativo
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {announcements.length === 0 && (
                    <div className="text-center py-12">
                      <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">Nenhum aviso publicado</h3>
                      <p className="text-gray-500">Crie o primeiro aviso para seus alunos</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Students Tab */}
          {activeTab === 'students' && (
            <div className="space-y-8">
              {/* Add Student Form */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                  <UserPlus className="h-5 w-5" />
                  <span>Adicionar Novo Aluno</span>
                </h2>
                <form onSubmit={handleAddStudent} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                    <input
                      type="text"
                      value={newStudent.name}
                      onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="João Silva"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={newStudent.email}
                      onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="joao@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-1">
                      <Key className="h-4 w-4" />
                      <span>Senha Inicial</span>
                    </label>
                    <input
                      type="password"
                      value={newStudent.password}
                      onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="123456"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status Inicial</label>
                    <select
                      value={newStudent.canAccessClasses ? 'active' : 'inactive'}
                      onChange={(e) => setNewStudent({ ...newStudent, canAccessClasses: e.target.value === 'active' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    >
                      <option value="active">✅ Acesso Liberado</option>
                      <option value="inactive">❌ Acesso Restrito</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2 font-medium"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Adicionar</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Students Management */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Gerenciar Alunos ({filteredStudents.length})</span>
                  </h2>
                  
                  {/* Search and Filter Controls */}
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Buscar por nome ou email..."
                        value={studentSearch}
                        onChange={(e) => setStudentSearch(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all w-64"
                      />
                    </div>
                    
                    <div className="relative">
                      <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <select
                        value={studentFilter}
                        onChange={(e) => setStudentFilter(e.target.value)}
                        className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none bg-white"
                      >
                        <option value="all">Todos os alunos</option>
                        <option value="active">Acesso liberado</option>
                        <option value="inactive">Acesso restrito</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {filteredStudents.map((student) => (
                    <div key={student.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-full ${student.canAccessClasses ? 'bg-green-100' : 'bg-red-100'}`}>
                            <User className={`h-6 w-6 ${student.canAccessClasses ? 'text-green-600' : 'text-red-600'}`} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-lg">{student.name}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span className="flex items-center space-x-1">
                                <Mail className="h-4 w-4" />
                                <span>{student.email}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleStudentAccess(student.id, student.canAccessClasses)}
                            className={`p-2 rounded-lg transition-colors ${
                              student.canAccessClasses
                                ? 'bg-green-100 text-green-600 hover:bg-green-200'
                                : 'bg-red-100 text-red-600 hover:bg-red-200'
                            }`}
                            title={student.canAccessClasses ? 'Remover acesso geral' : 'Liberar acesso geral'}
                          >
                            {student.canAccessClasses ? (
                              <CheckCircle className="h-5 w-5" />
                            ) : (
                              <XCircle className="h-5 w-5" />
                            )}
                          </button>
                          <button
                            onClick={() => handleDeleteStudent(student.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Excluir aluno"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>

                      <div className="mb-4">
                        <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                          student.canAccessClasses
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {student.canAccessClasses ? '✅ Acesso Liberado' : '❌ Acesso Restrito'}
                        </span>
                      </div>

                      {/* Course Access Control */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
                          <Shield className="h-4 w-4" />
                          <span>Controle de Acesso por Curso</span>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {courses.map((course) => {
                            const hasAccess = student.courseAccess?.includes(course.id) || false;
                            const courseClassCount = classes.filter(c => c.courseId === course.id).length;
                            return (
                              <label
                                key={course.id}
                                className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-all ${
                                  hasAccess 
                                    ? 'border-green-300 bg-green-50 shadow-sm' 
                                    : 'border-gray-200 hover:bg-gray-50'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={hasAccess}
                                  onChange={(e) => handleStudentCourseAccessChange(student.id, course.id, e.target.checked)}
                                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 h-4 w-4"
                                />
                                <div className="flex-1">
                                  <div className="font-medium text-sm text-gray-900">{course.name}</div>
                                  <div className="text-xs text-gray-500 flex items-center space-x-2">
                                    <span>{courseClassCount} aulas</span>
                                    {hasAccess && <span className="text-green-600">• Liberado</span>}
                                  </div>
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {filteredStudents.length === 0 && (
                    <div className="text-center py-12">
                      {studentSearch || studentFilter !== 'all' ? (
                        <>
                          <AlertCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-gray-600 mb-2">Nenhum aluno encontrado</h3>
                          <p className="text-gray-500">Tente ajustar os filtros de busca</p>
                        </>
                      ) : (
                        <>
                          <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-gray-600 mb-2">Nenhum aluno cadastrado</h3>
                          <p className="text-gray-500">Adicione o primeiro aluno para começar</p>
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
          onCancel={() => {
            setShowClassEditor(false);
            setEditingClass(null);
            setSelectedCourseForClass('');
          }}
        />
      )}
    </div>
  );
}