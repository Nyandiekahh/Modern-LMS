// src/pages/Dashboard/Teacher/index.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import {
  UsersIcon,
  BookOpenIcon,
  ClockIcon,
  PlusIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

const TeacherDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 max-w-full">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <div className="flex items-center mt-2 text-sm">
          <span className="text-gray-600">Welcome back, Professor {user?.lastName}</span>
          <span className="mx-2 text-gray-300">|</span>
          <span className="text-gray-600">Teaching Code: <span className="font-mono bg-gray-100 px-2 py-1 rounded text-gray-700">{user?.code || 'TECH123'}</span></span>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <UsersIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-2xl font-semibold text-gray-800 mt-1">72</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-50 p-3 rounded-lg">
              <BookOpenIcon className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Courses</p>
              <p className="text-2xl font-semibold text-gray-800 mt-1">3</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-50 p-3 rounded-lg">
              <ClockIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Hours Taught</p>
              <p className="text-2xl font-semibold text-gray-800 mt-1">156</p>
            </div>
          </div>
        </div>
      </div>

      {/* Current Teaching Units */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Current Teaching Units</h2>
          <button className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors text-sm font-medium">
            <PlusIcon className="h-4 w-4 mr-1.5" />
            Add Unit
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100">Unit Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100">Unit Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100">Students</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100">Assignments</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100">Next Class</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">CSC 101</td>
                <td className="px-6 py-4 text-sm text-gray-600">Web Development 101</td>
                <td className="px-6 py-4 text-sm text-gray-600">24</td>
                <td className="px-6 py-4 text-sm text-gray-600">3</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 text-gray-400 mr-1.5" />
                    2:00 PM Today
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">CSC 204</td>
                <td className="px-6 py-4 text-sm text-gray-600">Advanced JavaScript</td>
                <td className="px-6 py-4 text-sm text-gray-600">18</td>
                <td className="px-6 py-4 text-sm text-gray-600">2</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 text-gray-400 mr-1.5" />
                    10:00 AM Tomorrow
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Recent Activities</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {[
            { date: '2024-03-15', activity: 'Assignment "JavaScript Basics" graded for CSC 101', type: 'assignment' },
            { date: '2024-03-14', activity: 'New course material uploaded for Advanced JavaScript', type: 'material' },
            { date: '2024-03-14', activity: 'Virtual class conducted for Web Development 101', type: 'class' },
          ].map((item, index) => (
            <div key={index} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <div className="w-32 text-sm text-gray-500">{item.date}</div>
                <div className="flex-1 text-sm text-gray-700">{item.activity}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;