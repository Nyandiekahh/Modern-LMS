import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  DocumentTextIcon,
  CalendarIcon,
  UserGroupIcon,
  CheckCircleIcon,
  PlusIcon,
  ClockIcon,
  ChartBarIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

// Animated Progress Bar Component
const ProgressBar = ({ value, total, color = 'blue' }) => {
  const [width, setWidth] = useState(0);
  const percentage = (value / total) * 100;

  useEffect(() => {
    setTimeout(() => setWidth(percentage), 100);
  }, [percentage]);

  return (
    <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
      <div
        className={`absolute h-full transition-all duration-1000 ease-out bg-${color}-500 rounded-full`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

// Assignment Card Component
const AssignmentCard = ({ assignment, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  const getDueStatus = () => {
    const dueDate = new Date(assignment.dueDate);
    const now = new Date();
    const diffDays = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { text: 'Overdue', color: 'red' };
    if (diffDays === 0) return { text: 'Due Today', color: 'yellow' };
    if (diffDays <= 3) return { text: `Due in ${diffDays} days`, color: 'orange' };
    return { text: `Due in ${diffDays} days`, color: 'green' };
  };

  const status = getDueStatus();

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`transform transition-all duration-500 bg-white rounded-lg shadow hover:shadow-lg
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}
        ${isHovered ? 'scale-[1.02]' : ''}`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className={`p-2 rounded-lg bg-${assignment.type === 'quiz' ? 'purple' : 'blue'}-50`}>
              <DocumentTextIcon className={`h-6 w-6 text-${assignment.type === 'quiz' ? 'purple' : 'blue'}-500`} />
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-medium text-gray-900">{assignment.title}</h4>
              <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  {new Date(assignment.dueDate).toLocaleDateString()}
                </span>
                <span className="flex items-center">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  {new Date(assignment.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium bg-${status.color}-100 text-${status.color}-800`}>
            {status.text}
          </span>
        </div>
        
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">Submissions</span>
            <span className="text-sm font-medium text-gray-900">
              {assignment.submitted}/{assignment.total}
            </span>
          </div>
          <ProgressBar
            value={assignment.submitted}
            total={assignment.total}
            color={assignment.type === 'quiz' ? 'purple' : 'blue'}
          />
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"
                >
                  <UserGroupIcon className="h-4 w-4 text-gray-500" />
                </div>
              ))}
            </div>
            <span className="text-sm text-gray-500">+{assignment.total - 3} more</span>
          </div>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
              ${isHovered ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

// New Assignment Modal
const NewAssignmentModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'assignment',
    dueDate: '',
    totalPoints: ''
  });

  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
        <div className={`bg-white rounded-lg shadow-xl transform transition-all duration-300
          ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Create New Assignment</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="assignment">Assignment</option>
                  <option value="quiz">Quiz</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Due Date</label>
                <input
                  type="datetime-local"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Total Points</label>
                <input
                  type="number"
                  value={formData.totalPoints}
                  onChange={(e) => setFormData({ ...formData, totalPoints: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              Create Assignment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AssignmentManagement = () => {
  const { classId } = useParams();
  const [showNewAssignment, setShowNewAssignment] = useState(false);
  const [showContent, setShowContent] = useState(false);
  
  const mockAssignments = [
    {
      id: 1,
      title: 'JavaScript Basics Quiz',
      type: 'quiz',
      dueDate: '2024-03-25T23:59:59',
      totalPoints: 100,
      submitted: 18,
      total: 24
    },
    {
      id: 2,
      title: 'React Components Project',
      type: 'assignment',
      dueDate: '2024-03-28T23:59:59',
      totalPoints: 150,
      submitted: 15,
      total: 24
    },
    {
      id: 3,
      title: 'CSS Layout Challenge',
      type: 'assignment',
      dueDate: '2024-03-22T23:59:59',
      totalPoints: 50,
      submitted: 20,
      total: 24
    }
  ];

  useEffect(() => {
    setShowContent(true);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={`mb-8 flex justify-between items-center transition-all duration-700 transform
        ${showContent ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Assignments</h1>
          <p className="mt-1 text-sm text-gray-500">Manage class assignments and submissions</p>
        </div>
        <button
          onClick={() => setShowNewAssignment(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm 
            text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors group"
        >
          <PlusIcon className="h-5 w-5 mr-2 transform transition-transform group-hover:rotate-90" />
          New Assignment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockAssignments.map((assignment, index) => (
          <AssignmentCard key={assignment.id} assignment={assignment} index={index} />
        ))}
      </div>

      <NewAssignmentModal
        isOpen={showNewAssignment}
        onClose={() => setShowNewAssignment(false)}
      />
    </div>
  );
};

export default AssignmentManagement;