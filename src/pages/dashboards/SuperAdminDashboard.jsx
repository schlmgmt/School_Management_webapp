import { useAuth } from '../../context/AuthContext';
import { Shield, Users, School, Settings, BarChart, FileText } from 'lucide-react';

const SuperAdminDashboard = () => {
  const { user } = useAuth();

  const stats = [
    { icon: <School className="w-8 h-8" />, label: 'Total Schools', value: '25', color: 'bg-blue-500' },
    { icon: <Users className="w-8 h-8" />, label: 'Total Users', value: '5,420', color: 'bg-green-500' },
    { icon: <BarChart className="w-8 h-8" />, label: 'Active Sessions', value: '342', color: 'bg-purple-500' },
    { icon: <FileText className="w-8 h-8" />, label: 'Reports', value: '128', color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Shield className="w-10 h-10 text-primary-600 dark:text-primary-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Super Admin Dashboard
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Welcome back, <span className="font-semibold">{user?.name}</span>! You have full system access.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

export default SuperAdminDashboard;
