// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import { useAuth } from './context/AuthContext';

// Public Pages
import Landing from './pages/Landing';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Admin Pages
import AdminDashboard from './pages/Dashboard/Admin';
import SchoolManagement from './pages/Dashboard/Admin/SchoolManagement';
import UserManagement from './pages/Dashboard/Admin/UserManagement';
import SystemSettings from './pages/Dashboard/Admin/SystemSettings';
import Analytics from './pages/Dashboard/Admin/Analytics.jsx';

// Teacher Pages
import TeacherDashboard from './pages/Dashboard/Teacher';
import CourseCreator from './pages/Dashboard/Teacher/CourseCreator';
import ClassManagement from './pages/Dashboard/Teacher/ClassManagement';
import AssignmentManagement from './pages/Dashboard/Teacher/AssignmentManagement';
import GradingInterface from './pages/Dashboard/Teacher/GradingInterface';

// Student Pages
import StudentDashboard from './pages/Dashboard/Student';
import StudentCourses from './pages/Dashboard/Student/Courses';
import CourseView from './pages/Dashboard/Student/CourseView';
import StudentAssignments from './pages/Dashboard/Student/Assignments';
import StudentProgress from './pages/Dashboard/Student/Progress';
import Discussion from './pages/Dashboard/Student/Discussion';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Redirect /dashboard to appropriate dashboard based on role */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin', 'teacher', 'student']}>
                <DashboardRedirect />
              </ProtectedRoute>
            }
          />

          {/* Admin Dashboard Routes */}
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DashboardLayout>
                  <AdminDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin/schools"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DashboardLayout>
                  <SchoolManagement />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin/users"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DashboardLayout>
                  <UserManagement />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin/settings"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DashboardLayout>
                  <SystemSettings />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin/analytics"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DashboardLayout>
                  <Analytics />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Teacher Dashboard Routes */}
          <Route
            path="/dashboard/teacher"
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <DashboardLayout>
                  <TeacherDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/teacher/courses/create"
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <DashboardLayout>
                  <CourseCreator />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/teacher/classes"
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <DashboardLayout>
                  <ClassManagement />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/teacher/classes/:classId/assignments"
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <DashboardLayout>
                  <AssignmentManagement />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/teacher/grading/:assignmentId"
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <DashboardLayout>
                  <GradingInterface />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Student Dashboard Routes */}
          <Route
            path="/dashboard/student"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <DashboardLayout>
                  <StudentDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/student/courses"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <DashboardLayout>
                  <StudentCourses />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/student/courses/:courseId"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <DashboardLayout>
                  <CourseView />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/student/assignments"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <DashboardLayout>
                  <StudentAssignments />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/student/progress"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <DashboardLayout>
                  <StudentProgress />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/student/courses/:courseId/discussion"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <DashboardLayout>
                  <Discussion />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

// Helper component to redirect to appropriate dashboard
function DashboardRedirect() {
  const { user } = useAuth();
  
  if (user.role === 'admin') {
    return <Navigate to="/dashboard/admin" replace />;
  } else if (user.role === 'teacher') {
    return <Navigate to="/dashboard/teacher" replace />;
  } else if (user.role === 'student') {
    return <Navigate to="/dashboard/student" replace />;
  }
  
  return <Navigate to="/login" replace />;
}

export default App;