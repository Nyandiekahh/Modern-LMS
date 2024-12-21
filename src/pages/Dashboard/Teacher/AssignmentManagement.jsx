// src/pages/Dashboard/Teacher/AssignmentManagement.jsx
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  DocumentTextIcon,
  CalendarIcon,
  UserGroupIcon,
  CheckCircleIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

const AssignmentManagement = () => {
  const { classId } = useParams();
  const [showNewAssignment, setShowNewAssignment] = useState(false);
  
  const mockAssignments = [
    {
      id: 1,
      title: 'JavaScript Basics Quiz',
      dueDate: '2024-03-25T23:59:59',
      type: 'quiz',
      totalPoints: 100,
      submitted: 18,
      total: 24
    },
    // Add more mock assignments
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Assignments</h1>
          <p className="mt-1 text-sm text-gray-500">Manage class assignments and submissions</p>
        </div>
        <button
          onClick={() => setShowNewAssignment(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          New Assignment
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg font-medium text-gray-900">Current Assignments</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {mockAssignments.map((assignment) => (
            <div key={assignment.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DocumentTextIcon className="h-6 w-6 text-gray-400" />
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">{assignment.title}</h4>
                    <div className="flex items-center mt-1">
                      <CalendarIcon className="h-4 w-4 text-gray-400 mr-1" />
                      <p className="text-sm text-gray-500">
                        Due: {new Date(assignment.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-sm text-gray-500">
                    <div className="flex items-center">
                      <UserGroupIcon className="h-4 w-4 mr-1" />
                      <span>{assignment.submitted}/{assignment.total} submitted</span>
                    </div>
                  </div>
                  <button className="ml-6 bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssignmentManagement;