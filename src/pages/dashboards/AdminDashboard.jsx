import { useAuth } from '../../context/AuthContext';
import { UserCog, Users, BookOpen, Calendar, TrendingUp, Bell } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();

  const stats = [
    { icon: <Users className="w-8 h-8" />, label: 'Total Students', value: '856', color: 'bg-blue-500' },
    { icon: <UserCog className="w-8 h-8" />, label: 'Teachers', value: '42', color: 'bg-green-500' },
    { icon: <BookOpen className="w-8 h-8" />, label: 'Courses', value: '28', color: 'bg-purple-500' },
    { icon: <Calendar className="w-8 h-8" />, label: 'Events', value: '12', color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <UserCog className="w-10 h-10 text-primary-600 dark:text-primary-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Welcome back, john<span className="font-semibold">{user?.name}</span>! Manage your school effectively.
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

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-primary-600 dark:text-primary-400" />
              Recent Activities
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-900 dark:text-white font-medium">New student enrollment</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">2 hours ago</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-900 dark:text-white font-medium">Course schedule updated</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">5 hours ago</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-900 dark:text-white font-medium">New teacher assigned</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">1 day ago</p>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Bell className="w-6 h-6 mr-2 text-primary-600 dark:text-primary-400" />
              Notifications
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <p className="text-sm text-gray-900 dark:text-white font-medium">Pending approvals (3)</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Review student applications</p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-gray-900 dark:text-white font-medium">Upcoming event</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Parent-teacher meeting on Friday</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
