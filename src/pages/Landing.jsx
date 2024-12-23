import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  AcademicCapIcon,
  UserGroupIcon,
  ChartBarIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

// Custom hook for typewriter effect
const useTypewriter = (text, speed = 50) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    let timer;

    if (isTyping) {
      timer = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
          setIsTyping(false);
        }
      }, speed);
    }

    return () => clearInterval(timer);
  }, [text, speed, isTyping]);

  return displayText;
};

const Landing = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Using the custom typewriter hook
  const typedText = useTypewriter("Transform your educational journey with our innovative platform", 50);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Feature rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatureIndex(prev => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-lg shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EduVerse LMS
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="relative group text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Login
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>
              <Link
                to="/register"
                className="relative overflow-hidden bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium group"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 h-full w-full scale-0 rounded-md transition-all duration-300 group-hover:scale-100 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight opacity-0 animate-fadeIn" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                The Future of Education
              </span>
              <span className="block mt-2 text-gray-900">Made Simple</span>
            </h1>
            <p className="mt-3 text-xl text-gray-500 max-w-2xl mx-auto min-h-[2em]">
              {typedText}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 opacity-0 animate-fadeIn" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
              <Link
                to="/register"
                className="group relative px-8 py-3 text-white bg-blue-600 rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </Link>
              <Link
                to="/demo"
                className="group relative px-8 py-3 text-blue-600 bg-blue-50 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                Watch Demo
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float-delayed"></div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="py-16 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase animate-pulse">
              Features
            </h2>
            <p className="mt-2 text-4xl font-bold text-gray-900">
              Everything you need to manage learning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`transform transition-all duration-500 hover:scale-105 
                  ${index === currentFeatureIndex ? 'ring-2 ring-blue-400 ring-opacity-50' : ''}
                  bg-white rounded-xl p-6 shadow-xl hover:shadow-2xl`}
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                    <div className="space-y-2">
                      <div className="bg-blue-50 rounded-lg p-3">
                        {feature.icon}
                      </div>
                      <p className="text-xl font-semibold text-gray-900">{feature.title}</p>
                      <p className="text-gray-500">{feature.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 mix-blend-multiply"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Ready to get started?
                </h2>
                <p className="mt-4 text-lg text-blue-100">
                  Join thousands of students and educators today.
                </p>
              </div>
              <div className="mt-8 lg:mt-0 flex justify-end">
                <Link
                  to="/register"
                  className="group inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-all duration-300"
                >
                  Get Started
                  <ArrowRightIcon className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 6s ease-in-out infinite;
          animation-delay: 2s;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s linear infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-in forwards;
        }

        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

const features = [
  {
    title: "Smart Learning Paths",
    description: "AI-powered personalized learning journeys adapted to each student's pace and style.",
    icon: <AcademicCapIcon className="h-6 w-6 text-blue-600" />
  },
  {
    title: "Real-time Collaboration",
    description: "Seamless interaction between students and teachers with instant feedback systems.",
    icon: <UserGroupIcon className="h-6 w-6 text-blue-600" />
  },
  {
    title: "Advanced Analytics",
    description: "Comprehensive insights into student performance and learning patterns.",
    icon: <ChartBarIcon className="h-6 w-6 text-blue-600" />
  }
];

export default Landing;