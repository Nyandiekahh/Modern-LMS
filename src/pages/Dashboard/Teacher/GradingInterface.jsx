import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  UserCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChatBubbleLeftIcon,
  DocumentTextIcon,
  ClockIcon,
  StarIcon,
  PlusIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

// Grade Input Component
const GradeInput = ({ value, onChange, max = 100 }) => {
  const percentage = (value / max) * 100;
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayValue(value);
    }, 300);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="relative">
      <input
        type="number"
        min="0"
        max={max}
        value={value}
        onChange={onChange}
        className="block w-full rounded-md border-gray-300 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        <div className="text-sm font-medium text-gray-500">/ {max}</div>
      </div>
      <div className="mt-2 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// Submission Card Component
const SubmissionCard = ({ submission, isSelected, onClick, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  const getStatusColor = () => {
    switch (submission.status) {
      case 'graded':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-full px-4 py-4 flex items-start text-left transition-all duration-300
        ${isSelected ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50 border-l-4 border-transparent'}
        transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}
    >
      <div className={`relative group ${isHovered ? 'transform scale-105' : ''} transition-transform duration-300`}>
        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
          <UserCircleIcon className="h-10 w-10" />
        </div>
        <div className={`absolute -top-1 -right-1 h-5 w-5 rounded-full ${getStatusColor()} 
          flex items-center justify-center ring-2 ring-white`}>
          {submission.status === 'graded' && (
            <CheckCircleIcon className="h-3 w-3 text-white" />
          )}
        </div>
      </div>
      <div className="ml-4 flex-1">
        <h3 className="text-sm font-medium text-gray-900">{submission.studentName}</h3>
        <div className="mt-1 flex items-center text-xs text-gray-500 space-x-2">
          <ClockIcon className="h-4 w-4" />
          <span>{new Date(submission.submissionDate).toLocaleString()}</span>
        </div>
        {submission.grade && (
          <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
            <AcademicCapIcon className="h-3 w-3 mr-1" />
            Grade: {submission.grade}/100
          </div>
        )}
      </div>
    </button>
  );
};

// Answer Card Component
const AnswerCard = ({ answer, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`bg-gray-50 p-6 rounded-lg transition-all duration-500 transform
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        ${isHovered ? 'shadow-md -translate-y-0.5' : ''}`}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className={`h-8 w-8 rounded-full flex items-center justify-center
            transition-colors duration-300 ${isHovered ? 'bg-blue-200' : 'bg-blue-100'}`}>
            <span className={`text-sm font-medium transition-colors duration-300
              ${isHovered ? 'text-blue-700' : 'text-blue-600'}`}>
              {answer.question}
            </span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-900">{answer.answer}</p>
        </div>
      </div>
    </div>
  );
};

// Feedback Template Button Component
const FeedbackButton = ({ template, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group px-3 py-1 text-sm rounded-full transition-all duration-200
        ${isHovered ? 'bg-blue-100 text-blue-800' : 'bg-blue-50 text-blue-700'}`}
    >
      <span className="flex items-center">
        <PlusIcon className={`h-3 w-3 mr-1 transition-transform duration-200
          ${isHovered ? 'rotate-90' : ''}`} />
        {template}
      </span>
    </button>
  );
};

// Rubric Item Component
const RubricItem = ({ criterion, maxScore }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300
        ${isHovered ? 'bg-blue-50 shadow-sm' : 'bg-white'}`}
    >
      <span className="text-sm text-gray-700 flex items-center">
        <AcademicCapIcon className={`h-4 w-4 mr-2 transition-colors duration-300
          ${isHovered ? 'text-blue-500' : 'text-gray-400'}`} />
        {criterion}
      </span>
      <span className={`text-sm font-medium transition-colors duration-300
        ${isHovered ? 'text-blue-600' : 'text-gray-600'}`}>
        {maxScore} points
      </span>
    </div>
  );
};

// Main GradingInterface Component
const GradingInterface = () => {
  const { assignmentId } = useParams();
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [grade, setGrade] = useState('');
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

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
    {
      id: 2,
      studentName: 'Sarah Williams',
      submissionDate: '2024-03-15T15:45:00',
      status: 'graded',
      grade: 95,
      feedback: 'Excellent understanding of the concepts!',
      answers: [
        { question: 1, answer: 'HTML is the standard markup language for web pages' },
        { question: 2, answer: 'CSS handles the presentation and styling of a web page' }
      ]
    }
  ];

  const rubricItems = [
    { criterion: 'Understanding of Concepts', maxScore: 40 },
    { criterion: 'Clarity of Explanation', maxScore: 30 },
    { criterion: 'Proper Examples', maxScore: 30 }
  ];

  const feedbackTemplates = [
    'Great work!',
    'Good understanding',
    'Needs more detail',
    'Please review concepts',
    'Excellent examples',
    'Consider adding examples'
  ];

  useEffect(() => {
    setShowContent(true);
  }, []);

  const handleGradeSubmit = async () => {
    if (!grade || !feedback) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update submission status
      setSelectedSubmission(prev => ({
        ...prev,
        status: 'graded',
        grade,
        feedback
      }));

      // Show success notification
      setShowSuccessNotification(true);
      setTimeout(() => setShowSuccessNotification(false), 3000);
      
    } catch (error) {
      console.error('Error submitting grade:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addFeedbackTemplate = (template) => {
    setFeedback(prev => {
      if (!prev) return template;
      return `${prev} ${template}`;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className={`mb-8 transition-all duration-700 transform
        ${showContent ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
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
              {mockSubmissions.map((submission, index) => (
                <SubmissionCard
                  key={submission.id}
                  submission={submission}
                  isSelected={selectedSubmission?.id === submission.id}
                  onClick={() => {
                    setSelectedSubmission(submission);
                    setGrade(submission.grade || '');
                    setFeedback(submission.feedback || '');
                  }}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Grading Interface */}
        <div className="lg:col-span-2">
          {selectedSubmission ? (
            <div className="bg-white shadow rounded-lg">
              {/* Submission Header */}
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {selectedSubmission.studentName}'s Submission
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Submitted: {new Date(selectedSubmission.submissionDate).toLocaleString()}
                    </p>
                  </div>
                  {selectedSubmission.status === 'graded' && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      <CheckCircleIcon className="h-4 w-4 mr-1" />
                      Graded
                    </span>
                  )}
                </div>
              </div>

              <div className="px-4 py-5 sm:p-6">
                {/* Student's Answers */}
                <div className="space-y-4 mb-8">
                  {selectedSubmission.answers.map((answer, index) => (
                    <AnswerCard key={index} answer={answer} index={index} />
                  ))}
                </div>

                {/* Grading Form */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <h4 className="text-lg font-medium text-gray-900 flex items-center">
                      <StarIcon className="h-5 w-5 text-yellow-500 mr-2" />
                      Evaluation
                    </h4>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Grade (out of 100)
                      </label>
                      <div className="mt-1">
                        <GradeInput
                          value={grade}
                          onChange={(e) => setGrade(e.target.value)}
                          max={100}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Feedback
                      </label>
                      <div className="mt-1">
                        <textarea
                          rows={4}
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm 
                            focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          placeholder="Provide detailed feedback..."
                        />
                      </div>
                    </div>

                    {/* Quick Feedback Templates */}
                    <div className="space-y-4">
                      <h5 className="text-sm font-medium text-gray-700">Quick Feedback Templates</h5>
                      <div className="flex flex-wrap gap-2">
                        {feedbackTemplates.map((template, index) => (
                          <FeedbackButton
                            key={index}
                            template={template}
                            onClick={() => addFeedbackTemplate(template)}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Rubric */}
                    <div className="space-y-4">
                      <h5 className="text-sm font-medium text-gray-700">Grading Rubric</h5>
                      <div className="space-y-2">
                        {rubricItems.map((item, index) => (
                          <RubricItem
                            key={index}
                            criterion={item.criterion}
                            maxScore={item.maxScore}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedSubmission(null);
                          setGrade('');
                          setFeedback('');
                        }}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm 
                          font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleGradeSubmit}
                        disabled={isSubmitting || !grade || !feedback}
                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm 
                          font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors
                          ${(isSubmitting || !grade || !feedback) ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Submitting...
                          </>
                        ) : (
                          'Submit Grade'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg p-8">
              <div className="text-center">
                <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center
                  animate-bounce">
                  <DocumentTextIcon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mt-4 text-sm font-medium text-gray-900">No submission selected</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Select a student submission from the list to start grading
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Success Notification */}
      <div className={`fixed bottom-4 right-4 transform transition-all duration-500
        ${showSuccessNotification ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
          <CheckCircleIcon className="h-5 w-5 mr-2" />
          Grade submitted successfully!
        </div>
      </div>
    </div>
  );
};

export default GradingInterface;