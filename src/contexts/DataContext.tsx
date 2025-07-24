import React, { createContext, useContext, useState } from 'react';
import { Course, Class, Announcement, User } from '../types';

interface DataContextType {
  courses: Course[];
  classes: Class[];
  announcements: Announcement[];
  students: User[];
  addCourse: (course: Omit<Course, 'id'>) => void;
  addClass: (classData: Omit<Class, 'id' | 'createdAt'>) => void;
  updateClass: (id: string, updates: Partial<Class>) => void;
  deleteClass: (id: string) => void;
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'createdAt'>) => void;
  addStudent: (student: Omit<User, 'id'>) => void;
  updateStudent: (id: string, updates: Partial<User>) => void;
  deleteStudent: (id: string) => void;
  updateStudentCourseAccess: (studentId: string, courseId: string, hasAccess: boolean) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Mock initial data
const initialCourses: Course[] = [
  {
    id: '1',
    name: 'Desenvolvimento Web Completo',
    description: 'Aprenda HTML, CSS, JavaScript, React e Node.js do zero ao avançado.',
    icon: 'Code',
  },
  {
    id: '2',
    name: 'Marketing Digital',
    description: 'Domine as estratégias de marketing digital e redes sociais.',
    icon: 'Megaphone',
  },
  {
    id: '3',
    name: 'Design Gráfico',
    description: 'Criação de identidades visuais e materiais gráficos profissionais.',
    icon: 'Palette',
  },
];

const initialClasses: Class[] = [
  {
    id: '1',
    title: 'Introdução ao HTML',
    description: 'Fundamentos da linguagem de marcação HTML',
    type: 'video',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    courseId: '1',
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Conceitos Básicos de CSS',
    description: 'Aprenda os fundamentos do CSS para estilização',
    type: 'text',
    textContent: '<h2>Introdução ao CSS</h2><p>CSS (Cascading Style Sheets) é uma linguagem de estilo usada para descrever a apresentação de um documento escrito em HTML.</p><h3>Principais conceitos:</h3><ul><li>Seletores</li><li>Propriedades</li><li>Valores</li><li>Especificidade</li></ul>',
    courseId: '1',
    createdAt: new Date(),
  },
];

const initialAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Bem-vindos ao Portal da Filosofia!',
    content: 'Estamos felizes em tê-los conosco. Aproveitem ao máximo os cursos!',
    createdAt: new Date(),
  },
];

const initialStudents: User[] = [
  {
    id: '2',
    name: 'João Silva',
    email: 'joao@email.com',
    role: 'student',
    canAccessClasses: true,
    courseAccess: ['1', '2'], // Can access Web Development and Marketing
  },
  {
    id: '3',
    name: 'Maria Santos',
    email: 'maria@email.com',
    role: 'student',
    canAccessClasses: true,
    courseAccess: ['3'], // Can only access Design course
  },
  {
    id: '4',
    name: 'Pedro Costa',
    email: 'pedro@email.com',
    role: 'student',
    canAccessClasses: false,
    courseAccess: [], // No course access
  },
];

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [classes, setClasses] = useState<Class[]>(initialClasses);
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [students, setStudents] = useState<User[]>(initialStudents);

  const addCourse = (course: Omit<Course, 'id'>) => {
    const newCourse = { ...course, id: Date.now().toString() };
    setCourses(prev => [...prev, newCourse]);
  };

  const addClass = (classData: Omit<Class, 'id' | 'createdAt'>) => {
    const newClass = {
      ...classData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setClasses(prev => [...prev, newClass]);
  };

  const updateClass = (id: string, updates: Partial<Class>) => {
    setClasses(prev => prev.map(cls => 
      cls.id === id ? { ...cls, ...updates, updatedAt: new Date() } : cls
    ));
  };

  const deleteClass = (id: string) => {
    setClasses(prev => prev.filter(cls => cls.id !== id));
  };

  const addAnnouncement = (announcement: Omit<Announcement, 'id' | 'createdAt'>) => {
    const newAnnouncement = {
      ...announcement,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setAnnouncements(prev => [newAnnouncement, ...prev]);
  };

  const addStudent = (student: Omit<User, 'id'>) => {
    const newStudent = { 
      ...student, 
      id: Date.now().toString(),
      courseAccess: student.courseAccess || []
    };
    setStudents(prev => [...prev, newStudent]);
  };

  const updateStudent = (id: string, updates: Partial<User>) => {
    setStudents(prev => prev.map(student => 
      student.id === id ? { ...student, ...updates } : student
    ));
  };

  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(student => student.id !== id));
  };

  const updateStudentCourseAccess = (studentId: string, courseId: string, hasAccess: boolean) => {
    setStudents(prev => prev.map(student => {
      if (student.id === studentId) {
        const currentAccess = student.courseAccess || [];
        const newAccess = hasAccess 
          ? [...currentAccess.filter(id => id !== courseId), courseId]
          : currentAccess.filter(id => id !== courseId);
        return { ...student, courseAccess: newAccess };
      }
      return student;
    }));
  };

  return (
    <DataContext.Provider value={{
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
      updateStudentCourseAccess,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}