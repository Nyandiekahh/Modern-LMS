// src/pages/Dashboard/Teacher/GradingInterface.jsx
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  UserCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChatIcon
} from '@heroicons/react/24/outline';

const GradingInterface = () => {
  const { assignmentId } = useParams();
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [grade, setGrade] = useState('');

  const mockSubmissions = [
    {
      id: 1,
      studentName: 'Alex Johnson',
      submissionDate: '2024-03-15T14:30:00',
      status: 'pending',
      answers: [
        { question: 1, answer: 'HTML stands for Hypertext Markup Language' },
        { question: 2, answer: 'CSS is used for styling web pages' }
      ]
    },
    // Add more mock submissions
  ];

  const handleGradeSubmit = (submissionId) => {
    console.log('Submitting grade:', { submissionId, grade, feedback });
    // Handle grade submission logic here
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Grade Assignments</h1>
        <p className="mt-1 text-sm text-gray-500">Review and grade student submissions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submissions List */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Student Submissions</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {mockSubmissions.map((submission) => (
                <button
                  key={submission.id}
                  onClick={() => setSelectedSubmission(submission)}
                  className={`w-full px-4 py-3 flex items-center text-left hover:bg-gray-50 ${
                    selectedSubmission?.id === submission.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <UserCircleIcon className="h-8 w-8 text-gray-400" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{submission.studentName}</p>
                    <p className="text-sm text-gray-500">
                      Submitted: {new Date(submission.submissionDate).toLocaleString()}
                    </p>
                  </div>
                  {submission.status === 'graded' && (
                    <CheckCircleIcon className="h-5 w-5 text-green-500 ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grading Interface */}
        <div className="lg:col-span-2">
          {selectedSubmission ? (
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 className="text-lg font-medium text-gray-900">
                  {selectedSubmission.studentName}'s Submission
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Submitted on {new Date(selectedSubmission.submissionDate).toLocaleString()}
                </p>
              </div>

              <div className="px-4 py-5 sm:p-6">
                {/* Student's Answers */}
                <div className="space-y-4 mb-6">
                  {selectedSubmission.answers.map((answer, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-900 mb-2">
                        Question {answer.question}
                      </p>
                      <p className="text-sm text-gray-700">{answer.answer}</p>
                    </div>
                  ))}
                </div>

                {/* Grading Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Grade (out of 100)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Feedback
                    </label>
                    <textarea
                      rows={4}
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      onClick={() => {
                        setSelectedSubmission(null);
                        setFeedback('');
                        setGrade('');
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleGradeSubmit(selectedSubmission.id)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Submit Grade
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <UserCircleIcon className="h-12 w-12 text-gray-400 mx-auto" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No submission selected</h3>
              <p className="mt-1 text-sm text-gray-500">
                Select a student submission from the list to start grading
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GradingInterface;