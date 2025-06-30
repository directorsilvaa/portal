import React from 'react';
import { Course } from '../types';
import { Code, Megaphone, Palette, BookOpen } from 'lucide-react';

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
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
      <div className="p-6">
        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl mb-4 group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-300">
          <IconComponent className="h-8 w-8 text-white" />
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          {course.name}
        </h3>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          {course.description}
        </p>
        
        <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Saiba Mais
        </button>
      </div>
    </div>
  );
}