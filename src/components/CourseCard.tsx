import React from 'react';
import { Course } from '../types';
import { Code, Megaphone, Palette, BookOpen, ArrowRight, Clock, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CourseCardProps {
  course: Course;
}

const iconMap = {
  Code,
  Megaphone,
  Palette,
  BookOpen,
};

export default function CourseCard({ course }: CourseCardProps) {
  const IconComponent = iconMap[course.icon as keyof typeof iconMap] || BookOpen;

  return (
    <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
      {/* Course Image/Icon */}
      <div className="relative h-48 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 overflow-hidden">
        {course.image ? (
          <img 
            src={course.image} 
            alt={course.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="p-6 bg-white bg-opacity-20 backdrop-blur-sm rounded-3xl group-hover:scale-110 transition-transform duration-500">
              <IconComponent className="h-16 w-16 text-white" />
            </div>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Badge */}
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-800 flex items-center space-x-1">
          <Star className="h-3 w-3 text-yellow-500 fill-current" />
          <span>Premium</span>
        </div>
      </div>

      <div className="p-8">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
            {course.name}
          </h3>
          
          <p className="text-gray-600 leading-relaxed mb-6">
            {course.description}
          </p>
        </div>

        {/* Course Stats */}
        <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>40h de conteúdo</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>500+ alunos</span>
          </div>
        </div>
        
        <Link to= "/register" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
          <span>Saiba Mais</span>
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}