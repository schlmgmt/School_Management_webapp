import { useAuth } from '../../context/AuthContext';
import { GraduationCap, Users, BookOpen, ClipboardCheck, Calendar, MessageSquare } from 'lucide-react';

const TeacherDashboard = () => {
  const { user } = useAuth();

  const stats = [
    { icon: <Users className="w-8 h-8" />, label: 'My Students', value: '124', color: 'bg-blue-500' },
    { icon: <BookOpen className="w-8 h-8" />, label: 'Classes', value: '5', color: 'bg-green-500' },
    { icon: <ClipboardCheck className="w-8 h-8" />, label: 'Assignments', value: '18', color: 'bg-purple-500' },
    { icon: <Calendar className="w-8 h-8" />, label: 'Today\'s Classes', value: '3', color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <GraduationCap className="w-10 h-10 text-primary-600 dark:text-primary-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Teacher Dashboard
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Welcome back, <span className="font-semibold">{user?.name}</span>! Ready to inspire minds today?
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
          {/* Today's Schedule */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-primary-600 dark:text-primary-400" />
              Today's Schedule
            </h2>
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Mathematics - Grade 10</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Room 201</p>
                  </div>
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400">9:00 AM</span>
                </div>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Physics - Grade 11</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Lab 3</p>
                  </div>
                  <span className="text-xs font-medium text-green-600 dark:text-green-400">11:00 AM</span>
                </div>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Chemistry - Grade 12</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Lab 1</p>
                  </div>
                  <span className="text-xs font-medium text-purple-600 dark:text-purple-400">2:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <MessageSquare className="w-6 h-6 mr-2 text-primary-600 dark:text-primary-400" />
              Pending Tasks
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <p className="text-sm text-gray-900 dark:text-white font-medium">Grade assignments (12 pending)</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Due today</p>
              </div>
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <p className="text-sm text-gray-900 dark:text-white font-medium">Prepare lesson plan</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">For tomorrow's class</p>
              </div>
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <p className="text-sm text-gray-900 dark:text-white font-medium">Submit attendance</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">This week's attendance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
