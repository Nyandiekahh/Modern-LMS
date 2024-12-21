// src/pages/Dashboard/School/index.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext';
import {
  UserGroupIcon,
  AcademicCapIcon,
  ChartBarIcon,
  PlusIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SchoolDashboard = () => {
  const { user } = useAuth();
  const [showInviteModal, setShowInviteModal] = useState(false);

  const mockAnalytics = {
    studentEngagement: [
      { month: 'Jan', value: 65 },
      { month: 'Feb', value: 75 },
      { month: 'Mar', value: 85 },
      { month: 'Apr', value: 82 },
      { month: 'May', value: 90 },
      { month: 'Jun', value: 88 },
    ],
  };

  const stats = [
    { id: 1, name: 'Total Teachers', value: '24', icon: AcademicCapIcon },
    { id: 2, name: 'Total Students', value: '450', icon: UserGroupIcon },
    { id: 3, name: 'Active Courses', value: '32', icon: ChartBarIcon },
  ];

  const mockTeachers = [
    { id: 1, name: 'Sarah Johnson', department: 'Mathematics', students: 45, courses: 3 },
    { id: 2, name: 'Michael Chen', department: 'Sciences', students: 38, courses: 4 },
    { id: 3, name: 'Emily Brown', department: 'Literature', students: 52, courses: 3 },
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-display text-white mb-2">
            School Administration
          </h1>
          <p className="text-gray-300">School Code: <span className="font-mono bg-white/10 px-2 py-1 rounded">{user?.schoolCode || 'SCH123'}</span></p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setShowInviteModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-400 text-white rounded-lg transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Teacher</span>
        </motion.button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-white/5 text-primary-400">
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">{stat.name}</p>
                <p className="text-2xl font-display text-white">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Analytics Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
      >
        <h2 className="text-xl font-display text-white mb-6">Student Engagement</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockAnalytics.studentEngagement}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#0ea5e9"
                strokeWidth={2}
                dot={{ fill: '#0ea5e9' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Teachers List */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h2 className="text-xl font-display text-white mb-6">Teaching Staff</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTeachers.map((teacher) => (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-display text-white">{teacher.name}</h3>
                  <p className="text-gray-400 text-sm">{teacher.department}</p>
                </div>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <DocumentDuplicateIcon className="h-5 w-5 text-primary-400" />
                </button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Students</span>
                  <span className="text-white">{teacher.students}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Active Courses</span>
                  <span className="text-white">{teacher.courses}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SchoolDashboard;