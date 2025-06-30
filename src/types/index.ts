export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student';
  canAccessClasses: boolean;
  courseAccess: string[]; // Array of course IDs the student can access
  password?: string; // For admin to set initial password
}

export interface Course {
  id: string;
  name: string;
  description: string;
  icon: string;
  image?: string;
}

export interface Class {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  videoFile?: File;
  textContent?: string; // HTML content for text-based lessons
  type: 'video' | 'text'; // Lesson type
  courseId: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}