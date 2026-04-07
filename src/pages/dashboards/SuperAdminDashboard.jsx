import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Shield, Users, School, Settings, BarChart } from 'lucide-react';
import { API_BASE_URL, API_ENDPOINTS } from '../../config/api';
import SuperAdminNavbar from '../../components/SuperAdminNavbar';
import SchoolsPage from './SchoolsPage';
import AdminsPage from './AdminsPage';
import TeachersPage from './TeachersPage';
import StudentsPage from './StudentsPage';

const DashboardHome = ({ stats, loading, error }) => {
  return (
    <div className="flex-1 pl-64 max-sm:pl-0 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Shield className="w-10 h-10 text-primary-600 dark:text-primary-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            System Overview
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-800 dark:text-red-200">Error loading dashboard stats: {error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 animate-pulse"
              >
                <div className="bg-gray-200 dark:bg-gray-700 w-16 h-16 rounded-lg mb-4"></div>
                <div className="bg-gray-200 dark:bg-gray-700 h-4 w-24 mb-2"></div>
                <div className="bg-gray-200 dark:bg-gray-700 h-8 w-16"></div>
              </div>
            ))}
          </div>
        ) : (
          /* Stats Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
              >
                <div className={`${stat.color} w-16 h-16 rounded-lg flex items-center justify-center text-white mb-4`}>
                  {stat.icon}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Settings className="w-6 h-6 mr-2 text-primary-600 dark:text-primary-400" />
            System Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button className="p-4 bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30 rounded-lg text-left transition-colors border border-primary-200 dark:border-primary-800">
              <p className="font-semibold text-gray-900 dark:text-white">Manage Schools</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Add, edit, or remove schools</p>
            </button>
            <button className="p-4 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg text-left transition-colors border border-green-200 dark:border-green-800">
              <p className="font-semibold text-gray-900 dark:text-white">User Management</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Control user access and roles</p>
            </button>
            <button className="p-4 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg text-left transition-colors border border-purple-200 dark:border-purple-800">
              <p className="font-semibold text-gray-900 dark:text-white">System Settings</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Configure system parameters</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SuperAdminDashboard = () => {
  const { user } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        const accessToken = localStorage.getItem('access_token');
        console.log('Fetching dashboard stats with access token:', accessToken);
        const response = await fetch(
          `${API_BASE_URL}${API_ENDPOINTS.DASHBOARD_STATS}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
            },
          }
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard stats');
        }
        
        const data = await response.json();
        console.log('Dashboard stats:', data);
        const statsArray = [
          { 
            icon: <School className="w-8 h-8" />, 
            label: 'Total Schools', 
            value: data.total_schools || 0, 
            color: 'bg-blue-500' 
          },
          { 
            icon: <School className="w-8 h-8" />, 
            label: 'Active Schools', 
            value: data.active_schools || 0, 
            color: 'bg-green-500' 
          },
          { 
            icon: <Users className="w-8 h-8" />, 
            label: 'Total Admins', 
            value: data.total_admins || 0, 
            color: 'bg-purple-500' 
          },
          { 
            icon: <Users className="w-8 h-8" />, 
            label: 'Total Students', 
            value: data.total_students || 0, 
            color: 'bg-orange-500' 
          },
          { 
            icon: <BarChart className="w-8 h-8" />, 
            label: 'Total Teachers', 
            value: data.total_teachers || 0, 
            color: 'bg-pink-500' 
          },
        ];
        
        setStats(statsArray);
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SuperAdminNavbar active={activePage} setActive={setActivePage} />
      
      {activePage === 'dashboard' && <DashboardHome stats={stats} loading={loading} error={error} />}
      {activePage === 'schools' && <SchoolsPage />}
      {activePage === 'admins' && <AdminsPage />}
      {activePage === 'teachers' && <TeachersPage />}
      {activePage === 'students' && <StudentsPage />}
    </div>
  );
};

export default SuperAdminDashboard;
