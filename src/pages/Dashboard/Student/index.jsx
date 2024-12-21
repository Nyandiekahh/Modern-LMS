// src/pages/Dashboard/Student/index.jsx
import { motion } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext';

const StudentDashboard = () => {
  const { user } = useAuth();

  const mockCourses = [
    { id: 1, name: 'Introduction to React', progress: 75, nextLesson: 'React Hooks' },
    { id: 2, name: 'Advanced Mathematics', progress: 45, nextLesson: 'Calculus II' },
    { id: 3, name: 'World History', progress: 90, nextLesson: 'Industrial Revolution' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
      >
        <h1 className="text-3xl font-display text-white mb-2">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-gray-300">Ready to continue your learning journey?</p>
      </motion.div>

      {/* Course Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCourses.map((course) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
          >
            <h3 className="text-xl font-display text-white mb-4">{course.name}</h3>
            
            {/* Progress Bar */}
            <div className="relative h-2 bg-white/10 rounded-full mb-4">
              <div
                className="absolute inset-y-0 left-0 bg-primary-500 rounded-full"
                style={{ width: `${course.progress}%` }}
              />
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-400">{course.progress}% Complete</span>
              <span className="text-primary-400">Next: {course.nextLesson}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;