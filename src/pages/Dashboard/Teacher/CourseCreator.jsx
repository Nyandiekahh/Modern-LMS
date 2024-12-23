import React, { useState, useEffect } from 'react';
import {
  PlusIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  QueueListIcon,
  ClockIcon,
  TrashIcon,
  CheckCircleIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';

// Animated Step Indicator Component
const StepIndicator = ({ steps, currentStep }) => {
  return (
    <div className="relative">
      <nav aria-label="Progress">
        <ol className="flex items-center justify-between w-full">
          {steps.map((step, stepIdx) => (
            <li key={step.id} className="relative flex items-center">
              <div className="flex items-center">
                <div 
                  className={`transition-all duration-500 relative flex h-12 w-12 items-center justify-center rounded-full
                    ${currentStep >= step.id 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  <div className={`flex items-center justify-center h-8 w-8 rounded-full
                    ${currentStep > step.id ? 'bg-blue-600' : ''}`}>
                    {currentStep > step.id ? (
                      <CheckCircleIcon className="h-5 w-5 text-white" />
                    ) : (
                      <span className={`text-sm font-medium ${
                        currentStep >= step.id ? 'text-white' : 'text-gray-500'
                      }`}>
                        {step.id}
                      </span>
                    )}
                  </div>
                  <div className="absolute -bottom-8 w-max text-sm font-medium text-gray-600">
                    {step.name}
                  </div>
                </div>
                {stepIdx !== steps.length - 1 && (
                  <div className="relative ml-4 flex-1">
                    <div className="absolute h-0.5 w-24 bg-gray-200" />
                    <div 
                      className="absolute h-0.5 bg-blue-600 transition-all duration-500" 
                      style={{ width: currentStep > step.id ? '100%' : '0%' }}
                    />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

// Module Card Component
const ModuleCard = ({ module, index, onUpdate, onDelete }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`border border-gray-200 rounded-lg p-6 bg-white transition-all duration-500
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}
        ${isHovered ? 'shadow-lg transform scale-[1.01]' : 'shadow'}`}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${isHovered ? 'bg-blue-100' : 'bg-gray-100'}`}>
              <BookOpenIcon className={`h-5 w-5 ${isHovered ? 'text-blue-600' : 'text-gray-500'}`} />
            </div>
            <input
              type="text"
              placeholder="Module Title"
              value={module.title}
              onChange={(e) => onUpdate({ ...module, title: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => onDelete(module.id)}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-3 ml-12">
          {module.lessons.map((lesson, lessonIndex) => (
            <div
              key={lesson.id}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300
                ${isHovered ? 'bg-gray-50' : 'bg-white'}`}
            >
              <select
                value={lesson.type}
                onChange={(e) => {
                  const updatedLessons = [...module.lessons];
                  updatedLessons[lessonIndex] = {
                    ...lesson,
                    type: e.target.value
                  };
                  onUpdate({ ...module, lessons: updatedLessons });
                }}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                  const updatedLessons = [...module.lessons];
                  updatedLessons[lessonIndex] = {
                    ...lesson,
                    title: e.target.value
                  };
                  onUpdate({ ...module, lessons: updatedLessons });
                }}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                onClick={() => {
                  const updatedLessons = module.lessons.filter((_, i) => i !== lessonIndex);
                  onUpdate({ ...module, lessons: updatedLessons });
                }}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              const newLesson = {
                id: Date.now(),
                title: '',
                type: 'text',
                content: '',
                duration: 0
              };
              onUpdate({
                ...module,
                lessons: [...module.lessons, newLesson]
              });
            }}
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500"
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            Add Lesson
          </button>
        </div>
      </div>
    </div>
  );
};

// Form Step Component
const FormStep = ({ children, isActive, stepNumber }) => (
  <div className={`transition-all duration-500 transform
    ${isActive ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0 absolute'}`}>
    {children}
  </div>
);

const CourseCreator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showContent, setShowContent] = useState(false);
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

  useEffect(() => {
    setShowContent(true);
  }, []);

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={`mb-8 transition-all duration-700 transform
        ${showContent ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
        <h1 className="text-2xl font-semibold text-gray-900">Create New Course</h1>
        <p className="mt-1 text-sm text-gray-500">Set up your course structure and content</p>
      </div>

      <div className="mb-12">
        <StepIndicator steps={steps} currentStep={currentStep} />
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-8 relative">
          <FormStep isActive={currentStep === 1} stepNumber={1}>
            <div className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-sm font-medium text-gray-700">Course Title</label>
                <input
                  type="text"
                  value={courseData.title}
                  onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Course Code</label>
                <input
                  type="text"
                  value={courseData.code}
                  onChange={(e) => setCourseData({ ...courseData, code: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  rows={4}
                  value={courseData.description}
                  onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </FormStep>

          <FormStep isActive={currentStep === 2} stepNumber={2}>
            <div className="space-y-6 max-w-2xl">
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </FormStep>

          <FormStep isActive={currentStep === 3} stepNumber={3}>
            <div className="space-y-6">
              {courseData.modules.map((module, index) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  index={index}
                  onUpdate={(updatedModule) => {
                    const updatedModules = [...courseData.modules];
                    updatedModules[index] = updatedModule;
                    setCourseData({ ...courseData, modules: updatedModules });
                  }}
                  onDelete={(moduleId) => {
                    setCourseData({
                      ...courseData,
                      modules: courseData.modules.filter(m => m.id !== moduleId)
                    });
                  }}
                />
              ))}
              <button
                onClick={addModule}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm 
                  text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Module
              </button>
            </div>
          </FormStep>

          <FormStep isActive={currentStep === 4} stepNumber={4}>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Course Summary</h3>
                <dl className="grid grid-cols-1 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Title</dt>
                    <dd className="mt-1 text-sm text-gray-900">{courseData.title}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Code</dt>
                    <dd className="mt-1 text-sm text-gray-900">{courseData.code}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Modules</dt>
                    <dd className="mt-1 text-sm text-gray-900">{courseData.modules.length}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Duration</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {courseData.schedule.startDate} to {courseData.schedule.endDate}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            </FormStep>
        </div>

        {/* Navigation Controls */}
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium
              ${currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 transition-colors'}`}
          >
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
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
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm 
              text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors group"
          >
            {currentStep === steps.length ? (
              <>
                Create Course
                <CheckCircleIcon className="ml-2 h-4 w-4 transform group-hover:scale-110 transition-transform" />
              </>
            ) : (
              <>
                Next
                <svg
                  className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCreator;