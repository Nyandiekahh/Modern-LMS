// src/pages/Dashboard/Student/Courses.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpenIcon,
  ClockIcon,
  ChevronRightIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const StudentCourses = () => {
  const mockCourses = [
    {
      id: 1,
      code: 'CSC101',
      name: 'Web Development 101',
      instructor: 'Dr. Sarah Johnson',
      progress: 65,
      nextClass: '2024-03-20T14:00:00',
      modules: [
        { id: 1, name: 'HTML Basics', completed: true },
        { id: 2, name: 'CSS Fundamentals', completed: true },
        { id: 3, name: 'JavaScript Introduction', completed: false },
      ]
    },
    // Add more mock courses
  ];

  const [selectedCourse, setSelectedCourse] = useState(mockCourses[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">My Courses</h1>
        <p className="mt-1 text-sm text-gray-500">Access your enrolled courses and track your progress</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course List */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Enrolled Courses</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {mockCourses.map((course) => (
                <button
                  key={course.id}
                  onClick={() => setSelectedCourse(course)}
                  className={`w-full px-4 py-3 flex items-center text-left hover:bg-gray-50 ${
                    selectedCourse?.id === course.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <BookOpenIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{course.name}</h3>
                    <p className="text-sm text-gray-500">{course.code}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Course Details */}
        <div className="lg:col-span-2">
          {selectedCourse ? (
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 className="text-lg font-medium text-gray-900">{selectedCourse.name}</h3>
                <p className="mt-1 text-sm text-gray-500">Instructor: {selectedCourse.instructor}</p>
              </div>

              <div className="px-4 py-5 sm:p-6">
                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Course Progress</span>
                    <span>{selectedCourse.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${selectedCourse.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Next Class */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <ClockIcon className="h-5 w-5 text-blue-500 mr-2" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-900">Next Class</h4>
                      <p className="text-sm text-blue-700">
                        {new Date(selectedCourse.nextClass).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Modules */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Course Modules</h4>
                  <div className="space-y-2">
                    {selectedCourse.modules.map((module) => (
                      <Link
                        key={module.id}
                        to={`/dashboard/student/courses/${selectedCourse.id}/modules/${module.id}`}
                        className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {module.completed ? (
                              <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                            ) : (
                              <div className="h-5 w-5 border-2 border-gray-300 rounded-full mr-2" />
                            )}
                            <span className="text-sm text-gray-900">{module.name}</span>
                          </div>
                          <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <BookOpenIcon className="h-12 w-12 text-gray-400 mx-auto" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No course selected</h3>
              <p className="mt-1 text-sm text-gray-500">Select a course from the list to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentCourses;