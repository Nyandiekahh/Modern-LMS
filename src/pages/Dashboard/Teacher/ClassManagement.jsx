import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  UserGroupIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  ChartBarIcon,
  AcademicCapIcon,
  CalendarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

// Animated Progress Ring Component
const ProgressRing = ({ progress, size = 60, strokeWidth = 4 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background circle */}
        <circle
          className="text-gray-200"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          className="text-blue-600 transition-all duration-1000 ease-out"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-blue-600">
        {progress}%
      </div>
    </div>
  );
};

// Class Card Component
const ClassCard = ({ classItem, isSelected, onClick, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-full px-4 py-4 flex items-start text-left transition-all duration-300
        ${isSelected ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50 border-l-4 border-transparent'}
        transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}
    >
      <div className={`flex-shrink-0 p-2 rounded-lg transition-colors duration-300
        ${isSelected ? 'bg-blue-100' : 'bg-gray-100'}`}>
        <UserGroupIcon className={`h-6 w-6 transition-colors duration-300 transform
          ${isSelected ? 'text-blue-500' : 'text-gray-400'}
          ${isHovered ? 'rotate-12' : ''}`} />
      </div>
      <div className="ml-4 flex-1">
        <h3 className={`text-sm font-medium transition-colors duration-300
          ${isSelected ? 'text-blue-600' : 'text-gray-900'}`}>
          {classItem.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1">{classItem.code}</p>
        <div className="mt-2 flex items-center text-xs text-gray-500 space-x-4">
          <span className="flex items-center">
            <UserGroupIcon className="h-4 w-4 mr-1" />
            {classItem.students} Students
          </span>
          <span className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-1" />
            {new Date(classItem.nextSession).toLocaleDateString()}
          </span>
        </div>
      </div>
    </button>
  );
};

// Class Details Card Component
const ClassDetailsCard = ({ title, value, icon: Icon, color }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const duration = 1000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCurrentValue(value);
        clearInterval(timer);
      } else {
        setCurrentValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className={`px-4 py-5 bg-gray-50 rounded-lg overflow-hidden transition-all duration-500
      transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
      hover:shadow-md hover:scale-105`}>
      <dt className="text-sm font-medium text-gray-500 truncate flex items-center">
        <Icon className={`h-5 w-5 mr-2 ${color}`} />
        {title}
      </dt>
      <dd className="mt-2 text-3xl font-semibold text-gray-900">{currentValue}</dd>
    </div>
  );
};

const ClassManagement = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [showContent, setShowContent] = useState(false);
  
  const mockClasses = [
    {
      id: 1,
      name: 'Web Development 101',
      code: 'CSC101',
      students: 24,
      upcomingAssignments: 2,
      nextSession: '2024-03-20T14:00:00',
      progress: 65
    },
    {
      id: 2,
      name: 'Advanced JavaScript',
      code: 'CSC202',
      students: 18,
      upcomingAssignments: 3,
      nextSession: '2024-03-21T10:00:00',
      progress: 45
    },
    {
      id: 3,
      name: 'Mobile App Development',
      code: 'CSC301',
      students: 20,
      upcomingAssignments: 1,
      nextSession: '2024-03-22T15:30:00',
      progress: 30
    }
  ];

  useEffect(() => {
    setShowContent(true);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={`mb-8 transition-all duration-700 transform
        ${showContent ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
        <h1 className="text-2xl font-semibold text-gray-900">Class Management</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your classes and student activities</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Class List */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Your Classes</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {mockClasses.map((classItem, index) => (
                <ClassCard
                  key={classItem.id}
                  classItem={classItem}
                  isSelected={selectedClass?.id === classItem.id}
                  onClick={() => setSelectedClass(classItem)}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Class Details */}
        <div className="lg:col-span-2">
          {selectedClass ? (
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {selectedClass.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Class Code: {selectedClass.code}
                    </p>
                  </div>
                  <ProgressRing progress={selectedClass.progress} />
                </div>
              </div>

              <div className="px-4 py-5 sm:p-6">
                <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <ClassDetailsCard
                    title="Enrolled Students"
                    value={selectedClass.students}
                    icon={UserGroupIcon}
                    color="text-blue-500"
                  />
                  <ClassDetailsCard
                    title="Upcoming Assignments"
                    value={selectedClass.upcomingAssignments}
                    icon={DocumentTextIcon}
                    color="text-indigo-500"
                  />
                </dl>

                <div className="mt-6 space-y-4">
                  <Link
                    to={`/dashboard/teacher/classes/${selectedClass.id}/assignments`}
                    className="block px-4 py-4 bg-gray-50 rounded-lg hover:bg-gray-100 
                      transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md"
                  >
                    <div className="flex items-center">
                      <DocumentTextIcon className="h-6 w-6 text-indigo-500" />
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">Assignments</h4>
                        <p className="text-sm text-gray-500">
                          {selectedClass.upcomingAssignments} upcoming
                        </p>
                      </div>
                      <ChartBarIcon className="h-5 w-5 text-gray-400 ml-auto" />
                    </div>
                  </Link>

                  <Link
                    to={`/dashboard/teacher/classes/${selectedClass.id}/sessions`}
                    className="block px-4 py-4 bg-gray-50 rounded-lg hover:bg-gray-100 
                      transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md"
                  >
                    <div className="flex items-center">
                      <VideoCameraIcon className="h-6 w-6 text-green-500" />
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">Class Sessions</h4>
                        <p className="text-sm text-gray-500">
                          Next session: {new Date(selectedClass.nextSession).toLocaleString()}
                        </p>
                      </div>
                      <ClockIcon className="h-5 w-5 text-gray-400 ml-auto" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <div className="animate-bounce bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto">
                <UserGroupIcon className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="mt-4 text-sm font-medium text-gray-900">No class selected</h3>
              <p className="mt-1 text-sm text-gray-500">
                Select a class from the list to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassManagement;