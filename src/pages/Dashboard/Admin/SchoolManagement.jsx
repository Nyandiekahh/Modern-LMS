// src/pages/Dashboard/Admin/SchoolManagement.jsx
import React from 'react';
import { BuildingLibraryIcon, PlusIcon } from '@heroicons/react/24/outline';

const SchoolManagement = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">School Management</h1>
          <p className="mt-1 text-sm text-gray-500">Manage registered schools</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          <PlusIcon className="h-5 w-5 mr-2" />
          Add School
        </button>
      </div>
      {/* Add school management content */}
    </div>
  );
};

export default SchoolManagement;