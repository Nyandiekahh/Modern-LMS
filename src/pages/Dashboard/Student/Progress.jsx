// src/pages/Dashboard/Student/Progress.jsx
import React from 'react';
import {
  AcademicCapIcon,
  ChartBarIcon,
  ClockIcon,
  TrophyIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const StudentProgress = () => {
  const mockData = {
    totalHours: 156,
    averageGrade: '87%',
    completedCourses: '3/5',
    weeklyProgress: [
      { week: 'Week 1', progress: 85 },
      { week: 'Week 2', progress: 70 },
      { week: 'Week 3', progress: 90 },
      { week: 'Week 4', progress: 75 },
      { week: 'Week 5', progress: 95 },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">My Progress</h1>
        <p className="mt-1 text-sm text-gray-500">Track your learning journey and achievements</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ChartBarIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Average Grade</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{mockData.averageGrade}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AcademicCapIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Completed Courses</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{mockData.completedCourses}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ClockIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Study Hours</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{mockData.totalHours}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="bg-white shadow rounded-lg mb-8">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">Weekly Progress</h2>
        </div>
        <div className="p-6 space-y-4">
          {mockData.weeklyProgress.map((week, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>{week.week}</span>
                <span>{week.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${week.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">Recent Achievements</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {[
            { title: 'Completed JavaScript Basics', date: '2024-03-15', type: 'course', icon: CheckCircleIcon },
            { title: 'Perfect Score on CSS Quiz', date: '2024-03-12', type: 'achievement', icon: TrophyIcon },
            { title: '30-Day Study Streak', date: '2024-03-10', type: 'streak', icon: AcademicCapIcon },
          ].map((achievement, index) => (
            <div key={index} className="px-4 py-4 sm:px-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <achievement.icon className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{achievement.title}</p>
                  <p className="text-sm text-gray-500">{achievement.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentProgress;