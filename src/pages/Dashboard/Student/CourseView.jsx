// src/pages/Dashboard/Student/CourseView.jsx
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  BookOpenIcon,
  PlayIcon,
  DocumentTextIcon,
  ChatBubbleLeftIcon,
  CheckCircleIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';

const CourseView = () => {
  const { courseId } = useParams();
  const [currentModule, setCurrentModule] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);

  const mockCourseData = {
    id: courseId,
    title: 'Web Development 101',
    instructor: 'Dr. Sarah Johnson',
    modules: [
      {
        id: 1,
        title: 'Introduction to HTML',
        completed: true,
        lessons: [
          {
            id: 1,
            title: 'HTML Basics',
            type: 'video',
            duration: '10:00',
            completed: true,
            content: 'Video content URL'
          },
          {
            id: 2,
            title: 'Elements and Tags',
            type: 'text',
            duration: '15:00',
            completed: true,
            content: 'Lesson content about HTML elements and tags...'
          },
          {
            id: 3,
            title: 'HTML Quiz',
            type: 'quiz',
            duration: '20:00',
            completed: false
          }
        ]
      },
      {
        id: 2,
        title: 'CSS Fundamentals',
        completed: false,
        lessons: [
          {
            id: 4,
            title: 'CSS Selectors',
            type: 'video',
            duration: '12:00',
            completed: false,
            content: 'Video content URL'
          }
        ]
      }
    ]
  };

  const LessonContent = ({ lesson }) => {
    switch (lesson.type) {
      case 'video':
        return (
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <PlayIcon className="h-16 w-16 text-blue-500 mx-auto mb-4" />
            <p className="text-gray-600">Video Player Placeholder</p>
          </div>
        );
      case 'text':
        return (
          <div className="prose max-w-none">
            <p>{lesson.content}</p>
          </div>
        );
      case 'quiz':
        return (
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quiz: {lesson.title}</h3>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Start Quiz
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Course Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{mockCourseData.title}</h1>
            <p className="mt-1 text-sm text-gray-500">Instructor: {mockCourseData.instructor}</p>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <ChatBubbleLeftIcon className="h-5 w-5 mr-2 text-gray-400" />
            Discussion
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Course Modules Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Course Content</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {mockCourseData.modules.map((module, moduleIndex) => (
                <div key={module.id} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-900">{module.title}</h3>
                    {module.completed && (
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  <ul className="space-y-2 ml-4">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <li key={lesson.id}>
                        <button
                          onClick={() => {
                            setCurrentModule(moduleIndex);
                            setCurrentLesson(lessonIndex);
                          }}
                          className={`flex items-center w-full px-2 py-1 rounded-md text-sm ${
                            currentModule === moduleIndex && currentLesson === lessonIndex
                              ? 'bg-blue-50 text-blue-700'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {lesson.type === 'video' && <PlayIcon className="h-4 w-4 mr-2" />}
                          {lesson.type === 'text' && <DocumentTextIcon className="h-4 w-4 mr-2" />}
                          {lesson.type === 'quiz' && <BookOpenIcon className="h-4 w-4 mr-2" />}
                          <span className="truncate">{lesson.title}</span>
                          {lesson.completed && (
                            <CheckCircleIcon className="h-4 w-4 ml-auto text-green-500" />
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="lg:col-span-3">
          <div className="bg-white shadow rounded-lg">
            <div className="p-6">
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                {mockCourseData.modules[currentModule].lessons[currentLesson].title}
              </h2>
              <LessonContent lesson={mockCourseData.modules[currentModule].lessons[currentLesson]} />
            </div>

            {/* Navigation Controls */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
              <button
                disabled={currentLesson === 0 && currentModule === 0}
                onClick={() => {
                  if (currentLesson > 0) {
                    setCurrentLesson(currentLesson - 1);
                  } else if (currentModule > 0) {
                    setCurrentModule(currentModule - 1);
                    setCurrentLesson(mockCourseData.modules[currentModule - 1].lessons.length - 1);
                  }
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous Lesson
              </button>
              <button
                onClick={() => {
                  if (currentLesson < mockCourseData.modules[currentModule].lessons.length - 1) {
                    setCurrentLesson(currentLesson + 1);
                  } else if (currentModule < mockCourseData.modules.length - 1) {
                    setCurrentModule(currentModule + 1);
                    setCurrentLesson(0);
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Next Lesson
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseView;