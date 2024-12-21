// src/pages/Dashboard/Teacher/CourseCreator.jsx
import { useState } from 'react';
import {
  PlusIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  QueueListIcon,
  ClockIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

const CourseCreator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [courseData, setCourseData] = useState({
    title: '',
    code: '',
    description: '',
    schedule: {
      startDate: '',
      endDate: '',
      sessions: []
    },
    modules: []
  });

  const steps = [
    { id: 1, name: 'Basic Information' },
    { id: 2, name: 'Course Schedule' },
    { id: 3, name: 'Content Modules' },
    { id: 4, name: 'Review & Publish' }
  ];

  const addModule = () => {
    setCourseData({
      ...courseData,
      modules: [
        ...courseData.modules,
        {
          id: Date.now(),
          title: '',
          description: '',
          lessons: []
        }
      ]
    });
  };

  const addLesson = (moduleId) => {
    setCourseData({
      ...courseData,
      modules: courseData.modules.map(module => {
        if (module.id === moduleId) {
          return {
            ...module,
            lessons: [
              ...module.lessons,
              {
                id: Date.now(),
                title: '',
                type: 'text',
                content: '',
                duration: 0
              }
            ]
          };
        }
        return module;
      })
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Create New Course</h1>
        <p className="mt-1 text-sm text-gray-500">Set up your course structure and content.</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <nav aria-label="Progress">
          <ol className="flex items-center">
            {steps.map((step, stepIdx) => (
              <li key={step.id} className={`${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''} relative`}>
                <div className="flex items-center">
                  <div
                    className={`${
                      currentStep >= step.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-500'
                    } h-8 w-8 rounded-full flex items-center justify-center`}
                  >
                    {step.id}
                  </div>
                  <p className="ml-2 text-sm font-medium text-gray-900">{step.name}</p>
                </div>
                {stepIdx !== steps.length - 1 && (
                  <div className="absolute top-4 w-full h-0.5 bg-gray-200" />
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* Step Content */}
      <div className="bg-white shadow rounded-lg">
        {currentStep === 1 && (
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Course Title</label>
                <input
                  type="text"
                  value={courseData.title}
                  onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Course Code</label>
                <input
                  type="text"
                  value={courseData.code}
                  onChange={(e) => setCourseData({ ...courseData, code: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  rows={4}
                  value={courseData.description}
                  onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="p-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  value={courseData.schedule.startDate}
                  onChange={(e) => setCourseData({
                    ...courseData,
                    schedule: { ...courseData.schedule, startDate: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  value={courseData.schedule.endDate}
                  onChange={(e) => setCourseData({
                    ...courseData,
                    schedule: { ...courseData.schedule, endDate: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="p-6">
            <div className="space-y-6">
              {courseData.modules.map((module, index) => (
                <div key={module.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Module Title"
                      value={module.title}
                      onChange={(e) => {
                        const updatedModules = [...courseData.modules];
                        updatedModules[index].title = e.target.value;
                        setCourseData({ ...courseData, modules: updatedModules });
                      }}
                      className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  {/* Lessons */}
                  <div className="space-y-4 ml-6">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <div key={lesson.id} className="flex items-center space-x-4">
                        <select
                          value={lesson.type}
                          onChange={(e) => {
                            const updatedModules = [...courseData.modules];
                            updatedModules[index].lessons[lessonIndex].type = e.target.value;
                            setCourseData({ ...courseData, modules: updatedModules });
                          }}
                          className="rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="text">Text</option>
                          <option value="video">Video</option>
                          <option value="quiz">Quiz</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Lesson Title"
                          value={lesson.title}
                          onChange={(e) => {
                            const updatedModules = [...courseData.modules];
                            updatedModules[index].lessons[lessonIndex].title = e.target.value;
                            setCourseData({ ...courseData, modules: updatedModules });
                          }}
                          className="flex-1 rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => {
                            const updatedModules = [...courseData.modules];
                            updatedModules[index].lessons.splice(lessonIndex, 1);
                            setCourseData({ ...courseData, modules: updatedModules });
                          }}
                          className="p-2 text-gray-400 hover:text-red-500"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addLesson(module.id)}
                      className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500"
                    >
                      <PlusIcon className="h-4 w-4 mr-1" />
                      Add Lesson
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={addModule}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Module
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => {
              if (currentStep === steps.length) {
                // Handle course creation
                console.log('Create course:', courseData);
              } else {
                setCurrentStep(currentStep + 1);
              }
            }}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            {currentStep === steps.length ? 'Create Course' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCreator;