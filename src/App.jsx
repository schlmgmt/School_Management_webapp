import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import SuperAdminDashboard from './pages/dashboards/SuperAdminDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import TeacherDashboard from './pages/dashboards/TeacherDashboard';
import StudentDashboard from './pages/dashboards/StudentDashboard';

// Layout component
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

// Redirect component based on user role
const DashboardRedirect = () => {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/login" replace />;
  
  switch (user.role) {
    case 'super-admin':
      return <Navigate to="/dashboard/super-admin" replace />;
    case 'admin':
      return <Navigate to="/dashboard/admin" replace />;
    case 'teacher':
      return <Navigate to="/dashboard/teacher" replace />;
    case 'student':
      return <Navigate to="/dashboard/student" replace />;
    default:
      return <Navigate to="/" replace />;
  }
};

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              
              {/* Dashboard Redirect */}
              <Route path="/dashboard" element={<DashboardRedirect />} />
              
              {/* Protected Dashboard Routes */}
              <Route
                path="/dashboard/super-admin"
                element={
                  <ProtectedRoute allowedRoles={['super-admin']}>
                    <SuperAdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/admin"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/teacher"
                element={
                  <ProtectedRoute allowedRoles={['teacher']}>
                    <TeacherDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/student"
                element={
                  <ProtectedRoute allowedRoles={['student']}>
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />
              
              {/* Catch all - redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
