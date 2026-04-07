import { useState, useEffect } from 'react';
import { Menu, X, LayoutDashboard, Building2, Users, BookOpen, Home, LogOut, Moon, Sun } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const SuperAdminNavbar = ({ active, setActive }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const { logout, user } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  // Fetch user details from API
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!user || !user.user_id) {
        setLoadingUser(false);
        return;
      }

      try {
        const accessToken = localStorage.getItem('access_token');
        const response = await fetch(
          `https://school-management-backend-apis.onrender.com/api/v1/users/${user.user_id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserDetails(data);
          console.log('User details fetched:', data);
        } else {
          console.error('Failed to fetch user details:', response.status);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUserDetails();
  }, [user]);

  const getRoleDisplayName = (roleId) => {
    const roleMap = {
      1: 'Super Admin',
      2: 'Admin',
      3: 'Teacher',
      4: 'Student',
    };
    return roleMap[roleId] || 'User';
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      id: 'schools',
      label: 'Schools',
      icon: <Building2 className="w-5 h-5" />,
    },
    {
      id: 'admins',
      label: 'Admins',
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: 'teachers',
      label: 'Teachers',
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      id: 'students',
      label: 'Students',
      icon: <Home className="w-5 h-5" />,
    },
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden max-sm:fixed top-4 right-4 z-50 bg-primary-600 text-white p-2 rounded-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-gray-900 dark:bg-gray-950 text-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'max-sm:-translate-x-full'
        }`}
      >
        {/* Logo/Header */}
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <div className="flex-1">
            {loadingUser ? (
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded w-24 animate-pulse"></div>
                <div className="h-3 bg-gray-700 rounded w-16 animate-pulse"></div>
              </div>
            ) : userDetails ? (
              <div>
                <h2 className="text-lg font-bold text-primary-400">{userDetails.UserName}</h2>
                <p className="text-xs text-gray-400">{getRoleDisplayName(userDetails.RoleId)}</p>
              </div>
            ) : (
              <div>
                <h2 className="text-lg font-bold text-primary-400">User</h2>
                <p className="text-xs text-gray-400">Loading...</p>
              </div>
            )}
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-300" />
            )}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActive(item.id);
                setIsOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all mb-2 ${
                active === item.id
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-6 left-0 right-0 px-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 max-sm:block hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default SuperAdminNavbar;
