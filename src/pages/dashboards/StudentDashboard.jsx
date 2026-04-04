import { useAuth } from '../../context/AuthContext';
import { BookOpen, Calendar, Award, FileText, Clock, TrendingUp } from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();

  const stats = [
    { icon: <BookOpen className="w-8 h-8" />, label: 'My Courses', value: '6', color: 'bg-blue-500' },
    { icon: <FileText className="w-8 h-8" />, label: 'Assignments', value: '8', color: 'bg-green-500' },
    { icon: <Award className="w-8 h-8" />, label: 'Average Grade', value: 'A-', color: 'bg-purple-500' },
    { icon: <Calendar className="w-8 h-8" />, label: 'Attendance', value: '95%', color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <BookOpen className="w-10 h-10 text-primary-600 dark:text-primary-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Student Dashboard
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Welcome back, <span className="font-semibold">{user?.name}</span>! Let's continue your learning journey.
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
          {/* Upcoming Classes */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <Clock className="w-6 h-6 mr-2 text-primary-600 dark:text-primary-400" />
              Upcoming Classes
            </h2>
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Mathematics</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Mr. Johnson • Room 201</p>
                  </div>
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Today, 9:00 AM</span>
                </div>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">English Literature</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Ms. Smith • Room 105</p>
                  </div>
                  <span className="text-xs font-medium text-green-600 dark:text-green-400">Today, 11:00 AM</span>
                </div>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Physics</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Dr. Brown • Lab 3</p>
                  </div>
                  <span className="text-xs font-medium text-purple-600 dark:text-purple-400">Today, 2:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Grades */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-primary-600 dark:text-primary-400" />
              Recent Grades
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Mathematics Quiz</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Last week</p>
                </div>
                <span className="text-lg font-bold text-green-600 dark:text-green-400">A+</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">English Essay</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">2 weeks ago</p>
                </div>
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">A</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Physics Lab Report</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">3 weeks ago</p>
                </div>
                <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">B+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
