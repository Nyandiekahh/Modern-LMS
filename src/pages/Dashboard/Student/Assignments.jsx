// src/pages/Dashboard/Student/Assignments.jsx
import { useState } from 'react';
import {
  DocumentTextIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const StudentAssignments = () => {
  const [filter, setFilter] = useState('all');

  const mockAssignments = [
    {
      id: 1,
      title: 'JavaScript Basics Quiz',
      course: 'Web Development 101',
      dueDate: '2024-03-25T23:59:59',
      status: 'pending',
      type: 'quiz',
      points: 100
    },
    {
      id: 2,
      title: 'HTML Structure Analysis',
      course: 'Web Development 101',
      dueDate: '2024-03-20T23:59:59',
      status: 'submitted',
      type: 'assignment',
      points: 50
    },
    {
      id: 3,
      title: 'CSS Layout Project',
      course: 'Web Development 101',
      dueDate: '2024-03-18T23:59:59',
      status: 'graded',
      type: 'project',
      points: 100,
      score: 90
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-700 bg-yellow-50';
      case 'submitted':
        return 'text-blue-700 bg-blue-50';
      case 'graded':
        return 'text-green-700 bg-green-50';
      default:
        return 'text-gray-700 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return ExclamationTriangleIcon;
      case 'submitted':
        return ClockIcon;
      case 'graded':
        return CheckCircleIcon;
      default:
        return DocumentTextIcon;
    }
  };

  const filteredAssignments = filter === 'all' 
    ? mockAssignments 
    : mockAssignments.filter(a => a.status === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Assignments</h1>
        <p className="mt-1 text-sm text-gray-500">View and manage your course assignments</p>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex space-x-4">
          {['all', 'pending', 'submitted', 'graded'].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                filter === filterOption
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Assignments List */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">Your Assignments</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredAssignments.map((assignment) => {
            const StatusIcon = getStatusIcon(assignment.status);
            return (
              <div
                key={assignment.id}
                className="px-4 py-4 sm:px-6 hover:bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <div className={`p-2 rounded-lg ${getStatusColor(assignment.status)}`}>
                      <StatusIcon className="h-5 w-5" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-medium text-gray-900">{assignment.title}</h4>
                      <div className="mt-1">
                        <p className="text-sm text-gray-500">
                          {assignment.course} • Due: {new Date(assignment.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="ml-6 flex items-center space-x-4">
                    {assignment.status === 'graded' && (
                      <div className="text-sm">
                        <span className="text-gray-500">Score: </span>
                        <span className="font-medium text-gray-900">
                          {assignment.score}/{assignment.points}
                        </span>
                      </div>
                    )}
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudentAssignments;