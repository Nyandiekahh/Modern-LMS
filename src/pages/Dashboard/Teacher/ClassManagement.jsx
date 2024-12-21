// src/pages/Dashboard/Teacher/ClassManagement.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  UserGroupIcon,
  DocumentTextIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';

const ClassManagement = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  
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
    // Add more mock classes
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
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
              {mockClasses.map((classItem) => (
                <button
                  key={classItem.id}
                  onClick={() => setSelectedClass(classItem)}
                  className={`w-full px-4 py-3 flex items-center text-left hover:bg-gray-50 ${
                    selectedClass?.id === classItem.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <UserGroupIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{classItem.name}</h3>
                    <p className="text-sm text-gray-500">{classItem.code}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Class Details */}
        <div className="lg:col-span-2">
          {selectedClass ? (
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 className="text-lg font-medium text-gray-900">{selectedClass.name}</h3>
                <p className="mt-1 text-sm text-gray-500">Class Code: {selectedClass.code}</p>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="px-4 py-5 bg-gray-50 rounded-lg overflow-hidden sm:p-6">
                    <dt className="text-sm font-medium text-gray-500 truncate">Enrolled Students</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">{selectedClass.students}</dd>
                  </div>
                  <div className="px-4 py-5 bg-gray-50 rounded-lg overflow-hidden sm:p-6">
                    <dt className="text-sm font-medium text-gray-500 truncate">Class Progress</dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">{selectedClass.progress}%</dd>
                  </div>
                </dl>

                <div className="mt-6 space-y-4">
                  <Link
                    to={`/dashboard/teacher/classes/${selectedClass.id}/assignments`}
                    className="block px-4 py-4 bg-gray-50 rounded-lg hover:bg-gray-100"
                  >
                    <div className="flex items-center">
                      <DocumentTextIcon className="h-6 w-6 text-gray-400" />
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">Assignments</h4>
                        <p className="text-sm text-gray-500">{selectedClass.upcomingAssignments} upcoming</p>
                      </div>
                    </div>
                  </Link>

                  <Link
                    to={`/dashboard/teacher/classes/${selectedClass.id}/sessions`}
                    className="block px-4 py-4 bg-gray-50 rounded-lg hover:bg-gray-100"
                  >
                    <div className="flex items-center">
                      <VideoCameraIcon className="h-6 w-6 text-gray-400" />
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">Class Sessions</h4>
                        <p className="text-sm text-gray-500">Next session: {new Date(selectedClass.nextSession).toLocaleString()}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <UserGroupIcon className="h-12 w-12 text-gray-400 mx-auto" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No class selected</h3>
              <p className="mt-1 text-sm text-gray-500">Select a class from the list to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassManagement;