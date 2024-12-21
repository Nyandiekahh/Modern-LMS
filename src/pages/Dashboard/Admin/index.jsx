// src/pages/Dashboard/Admin/index.jsx
import React from 'react';
import {
  UsersIcon,
  AcademicCapIcon,
  BuildingLibraryIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const stats = [
    { id: 1, name: 'Total Users', value: '1,234', icon: UsersIcon },
    { id: 2, name: 'Active Teachers', value: '89', icon: AcademicCapIcon },
    { id: 3, name: 'Total Schools', value: '12', icon: BuildingLibraryIcon },
    { id: 4, name: 'Active Courses', value: '156', icon: ChartBarIcon },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">System overview and management</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd className="text-2xl font-semibold text-gray-900">{stat.value}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;