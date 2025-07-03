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
  AlertCircle,
  Upload,
  Image as ImageIcon,
  Sparkles,
  TrendingUp,
  Award,
  Clock,
  Star
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
  const [studentFilter, setStudentFilter] = useState('all');
  const [classSearch, setClassSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  
  // Editing states
  const [editingAnnouncement, setEditingAnnouncement] = useState<any>(null);
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [editingStudent, setEditingStudent] = useState<any>(null);

  // Form states
  const [newCourse, setNewCourse] = useState({ 
    name: '', 
    description: '', 
    icon: 'BookOpen',
    image: ''
  });
  const [announcementForm, setAnnouncementForm] = useState({ title: '', content: '' });
  const [newStudent, setNewStudent] = useState({ 
    name: '', 
    email: '', 
    password: '',
    role: 'student' as const, 
    canAccessClasses: true,
    courseAccess: [] as string[]
  });

  // Filter functions
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
                         student.email.toLowerCase().includes(studentSearch.toLowerCase());
    
    const matchesFilter = studentFilter === 'all' || 
                         (studentFilter === 'active' && student.canAccessClasses) ||
                         (studentFilter === 'inactive' && !student.canAccessClasses);
    
    return matchesSearch && matchesFilter;
  });

  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.title.toLowerCase().includes(classSearch.toLowerCase()) ||
                         cls.description.toLowerCase().includes(classSearch.toLowerCase());
    
    const matchesFilter = courseFilter === 'all' || cls.courseId === courseFilter;
    
    return matchesSearch && matchesFilter;
  });

  // Event handlers
  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCourse) {
      // Update course logic would go here
      console.log('Update course:', editingCourse.id, newCourse);
      setEditingCourse(null);
    } else {
      addCourse(newCourse);
    }
    setNewCourse({ name: '', description: '', icon: 'BookOpen', image: '' });
  };

  const handleEditCourse = (course: any) => {
    setEditingCourse(course);
    setNewCourse({
      name: course.name,
      description: course.description,
      icon: course.icon,
      image: course.image || ''
    });
  };

  const handleDeleteCourse = (courseId: string) => {
    if (confirm('Tem certeza que deseja excluir este curso? Todas as aulas relacionadas também serão removidas.')) {
      // Delete course logic would go here
      console.log('Delete course:', courseId);
    }
  };

  const handleAnnouncementSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAnnouncement) {
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

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStudent) {
      updateStudent(editingStudent.id, newStudent);
      setEditingStudent(null);
    } else {
      addStudent(newStudent);
    }
    setNewStudent({ 
      name: '', 
      email: '', 
      password: '',
      role: 'student', 
      canAccessClasses: true,
      courseAccess: []
    });
  };

  const handleEditStudent = (student: any) => {
    setEditingStudent(student);
    setNewStudent({
      name: student.name,
      email: student.email,
      password: '',
      role: student.role,
      canAccessClasses: student.canAccessClasses,
      courseAccess: student.courseAccess || []
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

  const tabButtons = [
    { id: 'overview', label: 'Dashboard', icon: BarChart3 },
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
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white mb-8 relative overflow-hidden">
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
                        ? 'border-purple-500 text-purple-600 bg-purple-50'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">Total de Cursos</p>
                      <p className="text-3xl font-bold">{courses.length}</p>
                      <p className="text-blue-100 text-xs mt-1">+2 este mês</p>
                    </div>
                    <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                      <BookOpen className="h-8 w-8" />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm font-medium">Total de Aulas</p>
                      <p className="text-3xl font-bold">{classes.length}</p>
                      <p className="text-green-100 text-xs mt-1">+5 esta semana</p>
                    </div>
                    <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                      <Video className="h-8 w-8" />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm font-medium">Total de Alunos</p>
                      <p className="text-3xl font-bold">{students.length}</p>
                      <p className="text-purple-100 text-xs mt-1">+12 este mês</p>
                    </div>
                    <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                      <Users className="h-8 w-8" />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm font-medium">Avisos Ativos</p>
                      <p className="text-3xl font-bold">{announcements.length}</p>
                      <p className="text-orange-100 text-xs mt-1">Todos ativos</p>
                    </div>
                    <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                      <Bell className="h-8 w-8" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                  <span>Ações Rápidas</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button
                    onClick={() => setActiveTab('courses')}
                    className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 hover:shadow-lg transition-all duration-300 group"
                  >
                    <Plus className="h-8 w-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-gray-900 mb-1">Novo Curso</h3>
                    <p className="text-sm text-gray-600">Adicionar curso</p>
                  </button>

                  <button
                    onClick={() => setActiveTab('classes')}
                    className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 hover:shadow-lg transition-all duration-300 group"
                  >
                    <Video className="h-8 w-8 text-green-600 mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-gray-900 mb-1">Nova Aula</h3>
                    <p className="text-sm text-gray-600">Criar aula</p>
                  </button>

                  <button
                    onClick={() => setActiveTab('students')}
                    className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200 hover:shadow-lg transition-all duration-300 group"
                  >
                    <UserPlus className="h-8 w-8 text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-gray-900 mb-1">Novo Aluno</h3>
                    <p className="text-sm text-gray-600">Cadastrar aluno</p>
                  </button>

                  <button
                    onClick={() => setActiveTab('announcements')}
                    className="p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-200 hover:shadow-lg transition-all duration-300 group"
                  >
                    <Bell className="h-8 w-8 text-orange-600 mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-gray-900 mb-1">Novo Aviso</h3>
                    <p className="text-sm text-gray-600">Publicar aviso</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                  <Plus className="h-6 w-6 text-blue-600" />
                  <span>{editingCourse ? 'Editar Curso' : 'Adicionar Novo Curso'}</span>
                </h2>
                
                {editingCourse && (
                  <div className="mb-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <p className="text-blue-800 font-medium">Editando: {editingCourse.name}</p>
                    <button
                      onClick={() => {
                        setEditingCourse(null);
                        setNewCourse({ name: '', description: '', icon: 'BookOpen', image: '' });
                      }}
                      className="text-blue-600 hover:text-blue-700 text-sm mt-1"
                    >
                      Cancelar edição
                    </button>
                  </div>
                )}

                <form onSubmit={handleAddCourse} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Nome do Curso</label>
                    <input
                      type="text"
                      value={newCourse.name}
                      onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Ex: Desenvolvimento Web Completo"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Descrição</label>
                    <textarea
                      value={newCourse.description}
                      onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Descreva o que o aluno aprenderá neste curso..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Ícone</label>
                      <select
                        value={newCourse.icon}
                        onChange={(e) => setNewCourse({ ...newCourse, icon: e.target.value })}
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
                        <ImageIcon className="h-4 w-4 inline mr-1" />
                        URL da Imagem
                      </label>
                      <input
                        type="url"
                        value={newCourse.image}
                        onChange={(e) => setNewCourse({ ...newCourse, image: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="https://exemplo.com/imagem.jpg"
                      />
                    </div>
                  </div>

                  {newCourse.image && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Preview da Imagem</label>
                      <div className="w-full h-48 bg-gray-100 rounded-xl overflow-hidden">
                        <img 
                          src={newCourse.image} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-3 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Save className="h-5 w-5" />
                    <span>{editingCourse ? 'Atualizar Curso' : 'Adicionar Curso'}</span>
                  </button>
                </form>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                  <BookOpen className="h-6 w-6 text-green-600" />
                  <span>Cursos Cadastrados</span>
                </h2>
                
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div key={course.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                      <div className="flex items-start space-x-4">
                        {course.image ? (
                          <img 
                            src={course.image} 
                            alt={course.name}
                            className="w-16 h-16 object-cover rounded-xl"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <BookOpen className="h-8 w-8 text-white" />
                          </div>
                        )}
                        
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-lg mb-2">{course.name}</h3>
                          <p className="text-gray-600 text-sm mb-3">{course.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-purple-600 bg-purple-50 px-3 py-1 rounded-full font-medium">
                              {classes.filter(c => c.courseId === course.id).length} aulas
                            </span>
                            <div className="flex items-center space-x-2">
                              <button 
                                onClick={() => handleEditCourse(course)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Editar"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteCourse(course.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Excluir"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {courses.length === 0 && (
                    <div className="text-center py-12">
                      <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">Nenhum curso cadastrado</h3>
                      <p className="text-gray-500">Crie seu primeiro curso para começar</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Classes Tab */}
          {activeTab === 'classes' && (
            <div className="space-y-8">
              {/* Header with Search and Filters */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                    <Video className="h-6 w-6 text-purple-600" />
                    <span>Gerenciar Aulas</span>
                  </h2>
                  
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    {/* Search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Buscar aulas..."
                        value={classSearch}
                        onChange={(e) => setClassSearch(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all w-64"
                      />
                    </div>
                    
                    {/* Course Filter */}
                    <select
                      value={courseFilter}
                      onChange={(e) => setCourseFilter(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="all">Todos os cursos</option>
                      {courses.map((course) => (
                        <option key={course.id} value={course.id}>{course.name}</option>
                      ))}
                    </select>
                    
                    {/* Add Class */}
                    <select
                      value={selectedCourseForClass}
                      onChange={(e) => setSelectedCourseForClass(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center space-x-2 font-medium shadow-lg hover:shadow-xl"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Nova Aula</span>
                    </button>
                  </div>
                </div>

                {/* Classes List */}
                <div className="space-y-4">
                  {filteredClasses.map((cls) => {
                    const course = courses.find(c => c.id === cls.courseId);
                    return (
                      <div key={cls.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              {cls.type === 'video' ? (
                                <div className="p-2 bg-blue-100 rounded-lg">
                                  <Video className="h-5 w-5 text-blue-600" />
                                </div>
                              ) : (
                                <div className="p-2 bg-green-100 rounded-lg">
                                  <FileText className="h-5 w-5 text-green-600" />
                                </div>
                              )}
                              <h3 className="font-bold text-gray-900 text-lg">{cls.title}</h3>
                              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                cls.type === 'video' 
                                  ? 'bg-blue-100 text-blue-800' 
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {cls.type === 'video' ? 'Vídeo Aula' : 'Aula em Texto'}
                              </span>
                            </div>
                            
                            <p className="text-gray-600 mb-3">{cls.description}</p>
                            
                            <div className="flex items-center space-x-6 text-sm text-gray-500">
                              <span className="flex items-center space-x-1">
                                <BookOpen className="h-4 w-4" />
                                <span>{course?.name}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{cls.createdAt.toLocaleDateString()}</span>
                              </span>
                              {cls.updatedAt && (
                                <span className="text-orange-600 flex items-center space-x-1">
                                  <Clock className="h-4 w-4" />
                                  <span>Atualizado: {cls.updatedAt.toLocaleDateString()}</span>
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
                      <Video className="h-20 w-20 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">
                        {classSearch || courseFilter !== 'all' ? 'Nenhuma aula encontrada' : 'Nenhuma aula cadastrada'}
                      </h3>
                      <p className="text-gray-500">
                        {classSearch || courseFilter !== 'all' 
                          ? 'Tente ajustar os filtros de busca'
                          : 'Comece criando sua primeira aula'
                        }
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Announcements Tab */}
          {activeTab === 'announcements' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                    <Bell className="h-6 w-6 text-orange-600" />
                    <span>{editingAnnouncement ? 'Editar Aviso' : 'Adicionar Novo Aviso'}</span>
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

                <form onSubmit={handleAnnouncementSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Título do Aviso</label>
                    <input
                      type="text"
                      value={announcementForm.title}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="Ex: Nova turma disponível"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Conteúdo</label>
                    <textarea
                      value={announcementForm.content}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })}
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
                    <span>{editingAnnouncement ? 'Atualizar Aviso' : 'Publicar Aviso'}</span>
                  </button>
                </form>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                  <Bell className="h-6 w-6 text-green-600" />
                  <span>Avisos Publicados</span>
                </h2>
                
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <div key={announcement.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-gray-900 text-lg">{announcement.title}</h3>
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
                              if (confirm('Tem certeza que deseja excluir este aviso?')) {
                                console.log('Delete announcement:', announcement.id);
                              }
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Excluir"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{announcement.content}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-gray-500 text-sm flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{announcement.createdAt.toLocaleDateString()}</span>
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
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum aviso publicado</h3>
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
              {/* Add/Edit Student Form */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                  <UserPlus className="h-6 w-6 text-purple-600" />
                  <span>{editingStudent ? 'Editar Aluno' : 'Adicionar Novo Aluno'}</span>
                </h2>
                
                {editingStudent && (
                  <div className="mb-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
                    <p className="text-purple-800 font-medium">Editando: {editingStudent.name}</p>
                    <button
                      onClick={() => {
                        setEditingStudent(null);
                        setNewStudent({ 
                          name: '', 
                          email: '', 
                          password: '',
                          role: 'student', 
                          canAccessClasses: true,
                          courseAccess: []
                        });
                      }}
                      className="text-purple-600 hover:text-purple-700 text-sm mt-1"
                    >
                      Cancelar edição
                    </button>
                  </div>
                )}

                <form onSubmit={handleAddStudent} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Nome Completo</label>
                    <input
                      type="text"
                      value={newStudent.name}
                      onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="João Silva"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Email</label>
                    <input
                      type="email"
                      value={newStudent.email}
                      onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="joao@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-1">
                      <Key className="h-4 w-4" />
                      <span>Senha {editingStudent ? '(deixe vazio para manter)' : 'Inicial'}</span>
                    </label>
                    <input
                      type="password"
                      value={newStudent.password}
                      onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
                      required={!editingStudent}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="123456"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Status</label>
                    <select
                      value={newStudent.canAccessClasses ? 'active' : 'inactive'}
                      onChange={(e) => setNewStudent({ ...newStudent, canAccessClasses: e.target.value === 'active' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    >
                      <option value="active">✅ Acesso Liberado</option>
                      <option value="inactive">❌ Acesso Restrito</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-2 font-semibold shadow-lg hover:shadow-xl"
                    >
                      <Save className="h-4 w-4" />
                      <span>{editingStudent ? 'Atualizar' : 'Adicionar'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Students Management */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                    <Users className="h-6 w-6 text-blue-600" />
                    <span>Gerenciar Alunos ({filteredStudents.length})</span>
                  </h2>
                  
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Buscar por nome ou email..."
                        value={studentSearch}
                        onChange={(e) => setStudentSearch(e.target.value)}
                        className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all w-64"
                      />
                    </div>
                    
                    <div className="relative">
                      <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <select
                        value={studentFilter}
                        onChange={(e) => setStudentFilter(e.target.value)}
                        className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none bg-white"
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
                    <div key={student.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <div className={`p-4 rounded-2xl ${student.canAccessClasses ? 'bg-green-100' : 'bg-red-100'}`}>
                            <User className={`h-8 w-8 ${student.canAccessClasses ? 'text-green-600' : 'text-red-600'}`} />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 text-xl">{student.name}</h3>
                            <div className="flex items-center space-x-6 text-gray-600 mt-1">
                              <span className="flex items-center space-x-1">
                                <Mail className="h-4 w-4" />
                                <span>{student.email}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditStudent(student)}
                            className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                            title="Editar aluno"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => updateStudent(student.id, { canAccessClasses: !student.canAccessClasses })}
                            className={`p-3 rounded-xl transition-colors ${
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
                            onClick={() => {
                              if (confirm('Tem certeza que deseja excluir este aluno?')) {
                                deleteStudent(student.id);
                              }
                            }}
                            className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                            title="Excluir aluno"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>

                      <div className="mb-6">
                        <span className={`inline-flex px-4 py-2 text-sm font-semibold rounded-full ${
                          student.canAccessClasses
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {student.canAccessClasses ? '✅ Acesso Liberado' : '❌ Acesso Restrito'}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                          <Shield className="h-5 w-5" />
                          <span>Controle de Acesso por Curso</span>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {courses.map((course) => {
                            const hasAccess = student.courseAccess?.includes(course.id) || false;
                            const courseClassCount = classes.filter(c => c.courseId === course.id).length;
                            return (
                              <label
                                key={course.id}
                                className={`flex items-center space-x-3 p-4 border rounded-xl cursor-pointer transition-all ${
                                  hasAccess 
                                    ? 'border-green-300 bg-green-50 shadow-sm' 
                                    : 'border-gray-200 hover:bg-gray-50'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={hasAccess}
                                  onChange={(e) => updateStudentCourseAccess(student.id, course.id, e.target.checked)}
                                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 h-5 w-5"
                                />
                                <div className="flex-1">
                                  <div className="font-semibold text-gray-900">{course.name}</div>
                                  <div className="text-sm text-gray-500 flex items-center space-x-2">
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
                    <div className="text-center py-16">
                      {studentSearch || studentFilter !== 'all' ? (
                        <>
                          <AlertCircle className="h-20 w-20 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum aluno encontrado</h3>
                          <p className="text-gray-500">Tente ajustar os filtros de busca</p>
                        </>
                      ) : (
                        <>
                          <Users className="h-20 w-20 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum aluno cadastrado</h3>
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