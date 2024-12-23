import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import {
  UsersIcon, DocumentTextIcon, BookOpenIcon, ClockIcon, 
  PlusIcon, CalendarIcon, ChartBarIcon
} from '@heroicons/react/24/outline';

// Animated Stats Card Component
const StatsCard = ({ icon: Icon, title, value, color }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      const increment = value / 30;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, 50);
      return () => clearInterval(interval);
    }, 500);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div 
      className={`bg-white rounded-lg p-6 border border-gray-100 shadow-sm 
        transform transition-all duration-500 hover:scale-105 hover:shadow-lg
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <div className="flex items-center space-x-4">
        <div className={`${color} p-3 rounded-lg transform transition-transform group-hover:rotate-12`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-800 mt-1">
            {count}
          </p>
        </div>
      </div>
      <div className={`mt-4 h-2 rounded-full bg-gray-100 overflow-hidden`}>
        <div 
          className={`h-full ${color.replace('bg-', 'bg-').replace('50', '500')} 
            transition-all duration-1000 ease-out`}
          style={{ width: `${(count / value) * 100}%` }}
        />
      </div>
    </div>
  );
};

// Activity Item Component with Animation
const ActivityItem = ({ date, activity, type, index }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  const getActivityIcon = () => {
    switch (type) {
      case 'assignment':
        return <DocumentTextIcon className="h-5 w-5 text-blue-500" />;
      case 'material':
        return <BookOpenIcon className="h-5 w-5 text-green-500" />;
      case 'class':
        return <UsersIcon className="h-5 w-5 text-purple-500" />;
      default:
        return null;
    }
  };

  return (
    <div 
      className={`px-6 py-4 hover:bg-gray-50 transition-all duration-300
        transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          {getActivityIcon()}
        </div>
        <div className="flex-1">
          <div className="text-sm text-gray-500">{date}</div>
          <div className="text-sm text-gray-700 mt-1">{activity}</div>
        </div>
      </div>
    </div>
  );
};

// Animated Table Row Component
const TableRow = ({ data, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <tr 
      className={`transform transition-all duration-300 
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}
        ${isHovered ? 'bg-gray-50 scale-[1.01]' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className={`h-2 w-2 rounded-full ${isHovered ? 'bg-blue-500' : 'bg-gray-400'}`} />
          <span className="font-medium text-gray-900">{data.code}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-600">{data.name}</td>
      <td className="px-6 py-4 text-sm text-gray-600">{data.students}</td>
      <td className="px-6 py-4 text-sm text-gray-600">{data.assignments}</td>
      <td className="px-6 py-4">
        <div className="flex items-center text-sm text-gray-600">
          <CalendarIcon className="h-4 w-4 text-gray-400 mr-1.5" />
          {data.nextClass}
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
          ${data.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
          {data.status}
        </span>
      </td>
    </tr>
  );
};

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    setShowWelcome(true);
  }, []);

  const mockTableData = [
    {
      code: 'CSC 101',
      name: 'Web Development 101',
      students: 24,
      assignments: 3,
      nextClass: '2:00 PM Today',
      status: 'Active'
    },
    {
      code: 'CSC 204',
      name: 'Advanced JavaScript',
      students: 18,
      assignments: 2,
      nextClass: '10:00 AM Tomorrow',
      status: 'Active'
    }
  ];

  return (
    <div className="p-6 max-w-full bg-gray-50">
      {/* Animated Welcome Header */}
      <div className={`mb-8 transform transition-all duration-700 ease-out
        ${showWelcome ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <div className="flex items-center mt-2 text-sm">
          <span className="text-gray-600">Welcome back, Professor {user?.lastName}</span>
          <span className="mx-2 text-gray-300">|</span>
          <span className="text-gray-600">Teaching Code: 
            <span className="font-mono bg-gray-100 px-2 py-1 rounded text-gray-700 ml-2">
              {user?.code || 'TECH123'}
            </span>
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          icon={UsersIcon}
          title="Total Students"
          value={72}
          color="bg-blue-50 text-blue-600"
        />
        <StatsCard
          icon={BookOpenIcon}
          title="Active Courses"
          value={3}
          color="bg-indigo-50 text-indigo-600"
        />
        <StatsCard
          icon={ClockIcon}
          title="Hours Taught"
          value={156}
          color="bg-purple-50 text-purple-600"
        />
      </div>

      {/* Teaching Units Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Current Teaching Units</h2>
          <button className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-600 
            rounded-md hover:bg-blue-100 transition-colors text-sm font-medium group">
            <PlusIcon className="h-4 w-4 mr-1.5 transform transition-transform group-hover:rotate-90" />
            Add Unit
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Students
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assignments
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Class
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockTableData.map((data, index) => (
                <TableRow key={data.code} data={data} index={index} />
              ))}
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
            { 
              date: '2024-03-15', 
              activity: 'Assignment "JavaScript Basics" graded for CSC 101', 
              type: 'assignment' 
            },
            { 
              date: '2024-03-14', 
              activity: 'New course material uploaded for Advanced JavaScript', 
              type: 'material' 
            },
            { 
              date: '2024-03-14', 
              activity: 'Virtual class conducted for Web Development 101', 
              type: 'class' 
            },
          ].map((item, index) => (
            <ActivityItem key={index} {...item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;