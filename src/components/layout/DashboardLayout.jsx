import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  HomeIcon,
  UsersIcon,
  BookOpenIcon,
  ChartBarIcon,
  ArrowRightOnRectangleIcon,
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline';

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('');

  // Enhanced navigation items with sub-items for nested routes
  const navigationItems = {
    teacher: [
      { 
        name: 'Dashboard', 
        icon: HomeIcon, 
        path: '/dashboard/teacher',
        exact: true
      },
      { 
        name: 'My Classes', 
        icon: UsersIcon, 
        path: '/dashboard/teacher/classes',
        subItems: [
          { 
            name: 'Class Management', 
            path: '/dashboard/teacher/classes/manage',
            icon: UserGroupIcon
          },
          { 
            name: 'Assignments', 
            path: '/dashboard/teacher/classes/assignments',
            icon: ClipboardDocumentListIcon
          },
          { 
            name: 'Grading', 
            path: '/dashboard/teacher/classes/grading',
            icon: AcademicCapIcon
          }
        ]
      },
      { 
        name: 'Live Session', 
        icon: VideoCameraIcon, 
        path: '/dashboard/teacher/live-session',
      },
      { 
        name: 'Course Creator', 
        icon: BookOpenIcon, 
        path: '/dashboard/teacher/courses',
      },
      { 
        name: 'Analytics', 
        icon: ChartBarIcon, 
        path: '/dashboard/teacher/analytics',
      }
    ]
  };

  const currentNavigation = navigationItems[user?.role] || [];

  // Enhanced path matching for nested routes
  const isActivePath = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // Check if any sub-item is active
  const hasActiveChild = (item) => {
    return item.subItems?.some(subItem => isActivePath(subItem.path));
  };

  // Handle logout with navigation
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Update active tab based on current path
  useEffect(() => {
    const activeNavItem = currentNavigation.find(item => 
      isActivePath(item.path) || hasActiveChild(item)
    );
    if (activeNavItem) {
      setActiveTab(activeNavItem.name);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-full px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/dashboard/teacher" className="flex items-center space-x-2">
                <AcademicCapIcon className="h-8 w-8 text-blue-600" />
                <h1 className="text-xl font-semibold text-gray-800">EduVerse LMS</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.firstName}</span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900
                  hover:bg-gray-100 rounded-md transition-colors duration-200"
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
        <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <nav className="mt-4 px-4">
            {currentNavigation.map((item) => {
              const isActive = isActivePath(item.path, item.exact);
              const hasActive = hasActiveChild(item);
              
              return (
                <div key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-2.5 text-sm rounded-md mb-1 
                      transition-all duration-200 group
                      ${(isActive || hasActive)
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                  >
                    <item.icon 
                      className={`h-5 w-5 mr-3 transition-colors duration-200
                        ${(isActive || hasActive) ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} 
                    />
                    <span>{item.name}</span>
                  </Link>

                  {/* Sub-items */}
                  {item.subItems && (isActive || hasActive) && (
                    <div className="ml-6 space-y-1 mt-1">
                      {item.subItems.map((subItem) => {
                        const isSubActive = isActivePath(subItem.path);
                        return (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className={`flex items-center px-4 py-2 text-sm rounded-md
                              transition-all duration-200 group
                              ${isSubActive
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                          >
                            <subItem.icon 
                              className={`h-4 w-4 mr-2 transition-colors duration-200
                                ${isSubActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} 
                            />
                            <span>{subItem.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;