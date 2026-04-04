import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Users, Award, Shield, ArrowRight } from 'lucide-react';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <Shield className="w-12 h-12" />,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security for your school data'
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Multi-Role Access',
      description: 'Customized dashboards for admins, teachers, and students'
    },
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: 'Easy Management',
      description: 'Streamlined processes for academic administration'
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: 'Performance Tracking',
      description: 'Comprehensive analytics and reporting tools'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              School Management System
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-primary-100">
              Empowering Education Through Technology
            </p>
            <p className="text-lg mb-10 text-primary-50 max-w-2xl mx-auto">
              A comprehensive platform for managing school operations, tracking student progress,
              and facilitating seamless communication between administrators, teachers, and students.
            </p>
            {!user && (
              <Link
                to="/login"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Our System?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Built with modern technology to meet all your educational needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-200 dark:border-gray-700"
            >
              <div className="text-primary-600 dark:text-primary-400 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Transform Your School?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Join thousands of educational institutions already using our platform
          </p>
          {!user && (
            <Link
              to="/login"
              className="inline-block px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold text-lg transition-colors duration-200"
            >
              Login Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
