// src/components/layout/DashboardLayout.jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  HomeIcon,
  UsersIcon,
  BookOpenIcon,
  ChartBarIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigationItems = {
    teacher: [
      { name: 'Dashboard', icon: HomeIcon, path: '/dashboard/teacher' },
      { name: 'My Classes', icon: UsersIcon, path: '/dashboard/teacher/classes' },
      { name: 'Course Creator', icon: BookOpenIcon, path: '/dashboard/teacher/courses' },
      { name: 'Analytics', icon: ChartBarIcon, path: '/dashboard/teacher/analytics' },
    ]
  };

  const currentNavigation = navigationItems[user?.role] || [];

  const isCurrentPath = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-full px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-800">EduVerse LMS</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.firstName}</span>
              <button
                onClick={logout}
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200">
          <nav className="mt-4 px-4">
            {currentNavigation.map((item) => {
              const isActive = isCurrentPath(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-4 py-2.5 text-sm rounded-md mb-1 transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className={`h-5 w-5 mr-3 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;