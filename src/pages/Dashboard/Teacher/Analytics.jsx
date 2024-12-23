import React from 'react';
import { ChartBarIcon, UserGroupIcon, DocumentTextIcon, ClockIcon } from '@heroicons/react/24/outline';

const TeacherAnalytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Analytics Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">View your teaching statistics and performance metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Students', value: '124', icon: UserGroupIcon, color: 'blue' },
          { title: 'Active Courses', value: '8', icon: DocumentTextIcon, color: 'green' },
          { title: 'Completion Rate', value: '87%', icon: ChartBarIcon, color: 'purple' },
          { title: 'Teaching Hours', value: '156', icon: ClockIcon, color: 'yellow' }
        ].map((stat, index) => (
          <div 
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add more analytics content as needed */}
    </div>
  );
};

export default TeacherAnalytics;