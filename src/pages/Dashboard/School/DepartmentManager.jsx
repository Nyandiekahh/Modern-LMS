// src/pages/Dashboard/School/DepartmentManager.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  TrashIcon,
  UserGroupIcon,
  AcademicCapIcon,
} from '@heroicons/react/outline';

const DepartmentManager = () => {
  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: 'Mathematics',
      head: 'Dr. Sarah Johnson',
      teachers: 5,
      students: 120,
      courses: ['Calculus', 'Algebra', 'Statistics'],
    },
    {
      id: 2,
      name: 'Sciences',
      head: 'Prof. Michael Chen',
      teachers: 6,
      students: 150,
      courses: ['Physics', 'Chemistry', 'Biology'],
    },
  ]);

  const [newDepartment, setNewDepartment] = useState({
    name: '',
    head: '',
  });

  const addDepartment = () => {
    if (newDepartment.name && newDepartment.head) {
      setDepartments([
        ...departments,
        {
          id: departments.length + 1,
          ...newDepartment,
          teachers: 0,
          students: 0,
          courses: [],
        },
      ]);
      setNewDepartment({ name: '', head: '' });
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
      >
        <h2 className="text-xl font-display text-white mb-6">Department Management</h2>

        {/* Add New Department Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Department Name"
            value={newDepartment.name}
            onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
            className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500"
          />
          <input
            type="text"
            placeholder="Department Head"
            value={newDepartment.head}
            onChange={(e) => setNewDepartment({ ...newDepartment, head: e.target.value })}
            className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500"
          />
          <button
            onClick={addDepartment}
            className="md:col-span-2 flex items-center justify-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-400 text-white rounded-lg transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add Department</span>
          </button>
        </div>

        {/* Departments List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {departments.map((dept) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 rounded-lg p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-display text-white">{dept.name}</h3>
                  <p className="text-gray-400 text-sm">Head: {dept.head}</p>
                </div>
                <button className="p-2 text-red-400 hover:text-red-300 transition-colors">
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2 text-gray-400">
                  <AcademicCapIcon className="h-5 w-5" />
                  <span>{dept.teachers} Teachers</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <UserGroupIcon className="h-5 w-5" />
                  <span>{dept.students} Students</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">Active Courses</h4>
                <div className="flex flex-wrap gap-2">
                  {dept.courses.map((course, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-white/10 rounded-lg text-sm text-white"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DepartmentManager;