import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import Header from '../components/Header';
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
  X
} from 'lucide-react';

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const { classes, announcements, courses } = useData();
  const [selectedClass, setSelectedClass] = useState<any>(null);

  // Filter classes based on user's course access
  const userClasses = classes.filter(cls => {
    const course = courses.find(c => c.id === cls.courseId);
    return course && user?.canAccessClasses && user?.courseAccess?.includes(cls.courseId);
  });

  // Get courses the user has access to
  const userCourses = courses.filter(course => 
    user?.courseAccess?.includes(course.id)
  );

  const handleWatchClass = (cls: any) => {
    setSelectedClass(cls);
  };

  const closeClassViewer = () => {
    setSelectedClass(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Olá, {user?.name}! 👋
              </h1>
              <p className="text-blue-100">
                Bem-vindo ao seu portal de estudos
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 rounded-full p-3">
                <User className="h-8 w-8" />
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Access Status */}
            <div className={`p-6 rounded-xl ${user?.canAccessClasses 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center space-x-3">
                {user?.canAccessClasses ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                )}
                <div>
                  <h3 className={`font-semibold ${user?.canAccessClasses ? 'text-green-800' : 'text-red-800'}`}>
                    {user?.canAccessClasses ? 'Acesso Liberado' : 'Acesso Restrito'}
                  </h3>
                  <p className={`text-sm ${user?.canAccessClasses ? 'text-green-600' : 'text-red-600'}`}>
                    {user?.canAccessClasses 
                      ? `Você tem acesso a ${userCourses.length} curso(s)`
                      : 'Entre em contato com o suporte para liberar seu acesso'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* My Courses */}
            {user?.canAccessClasses && userCourses.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Meus Cursos</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userCourses.map((course) => {
                    const courseClasses = classes.filter(c => c.courseId === course.id);
                    return (
                      <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <h3 className="font-semibold text-gray-900 mb-2">{course.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{course.description}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{courseClasses.length} aulas disponíveis</span>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                            Ativo
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Classes Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Video className="h-6 w-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-900">Minhas Aulas</h2>
              </div>

              {user?.canAccessClasses ? (
                userClasses.length > 0 ? (
                  <div className="space-y-4">
                    {userClasses.map((cls) => {
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
                                  <BookOpen className="h-4 w-4" />
                                  <span>{course?.name}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{cls.createdAt.toLocaleDateString()}</span>
                                </span>
                              </div>
                            </div>
                            <button 
                              onClick={() => handleWatchClass(cls)}
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 ml-4"
                            >
                              {cls.type === 'video' ? (
                                <>
                                  <Play className="h-4 w-4" />
                                  <span>Assistir</span>
                                </>
                              ) : (
                                <>
                                  <Eye className="h-4 w-4" />
                                  <span>Ler</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">Nenhuma aula disponível</h3>
                    <p className="text-gray-500">
                      {userCourses.length === 0 
                        ? 'Você ainda não tem acesso a nenhum curso'
                        : 'As aulas aparecerão aqui quando forem disponibilizadas'
                      }
                    </p>
                  </div>
                )
              ) : (
                <div className="text-center py-12">
                  <AlertTriangle className="h-16 w-16 text-red-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-red-600 mb-2">Acesso Restrito</h3>
                  <p className="text-red-500 mb-4">
                    Seu acesso às aulas ainda não foi liberado
                  </p>
                  <a 
                    href="https://wa.me/5511999999999" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center space-x-2"
                  >
                    <span>Falar com Suporte</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Announcements */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Bell className="h-6 w-6 text-orange-600" />
                <h2 className="text-xl font-bold text-gray-900">Avisos</h2>
              </div>

              {announcements.length > 0 ? (
                <div className="space-y-4">
                  {announcements.slice(0, 3).map((announcement) => (
                    <div key={announcement.id} className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded-r-lg">
                      <h3 className="font-semibold text-gray-900 mb-1">{announcement.title}</h3>
                      <p className="text-gray-700 text-sm mb-2">{announcement.content}</p>
                      <p className="text-xs text-gray-500">
                        {announcement.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Nenhum aviso no momento</p>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Seu Progresso</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Cursos Disponíveis</span>
                  <span className="font-semibold text-blue-600">{userCourses.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Aulas Disponíveis</span>
                  <span className="font-semibold text-green-600">{userClasses.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status</span>
                  <span className={`font-semibold ${user?.canAccessClasses ? 'text-green-600' : 'text-red-600'}`}>
                    {user?.canAccessClasses ? 'Ativo' : 'Pendente'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Class Viewer Modal */}
      {selectedClass && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                {selectedClass.type === 'video' ? (
                  <Video className="h-6 w-6 text-blue-600" />
                ) : (
                  <FileText className="h-6 w-6 text-green-600" />
                )}
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedClass.title}</h2>
                  <p className="text-gray-600 text-sm">{selectedClass.description}</p>
                </div>
              </div>
              <button
                onClick={closeClassViewer}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {selectedClass.type === 'video' ? (
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  {selectedClass.videoUrl ? (
                    selectedClass.videoUrl.includes('youtube.com') || selectedClass.videoUrl.includes('youtu.be') ? (
                      <iframe
                        src={selectedClass.videoUrl.replace('watch?v=', 'embed/')}
                        className="w-full h-full"
                        allowFullScreen
                        title={selectedClass.title}
                      />
                    ) : selectedClass.videoUrl.includes('vimeo.com') ? (
                      <iframe
                        src={selectedClass.videoUrl.replace('vimeo.com/', 'player.vimeo.com/video/')}
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
                      <p className="text-gray-500">Vídeo não disponível</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="prose max-w-none">
                  <div 
                    dangerouslySetInnerHTML={{ __html: selectedClass.textContent || '<p>Conteúdo não disponível</p>' }}
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