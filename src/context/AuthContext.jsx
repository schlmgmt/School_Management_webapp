import { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Decode JWT token
const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

// Role mapping
const getRoleName = (roleId) => {
  const roleMap = {
    0: 'super-admin',
    1: 'admin',
    2: 'teacher',
    3: 'student',
  };
  return roleMap[roleId] || 'student';
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved tokens in localStorage
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    
    if (accessToken && refreshToken) {
      const decodedToken = decodeToken(accessToken);
      
      if (decodedToken) {
        const now = Date.now() / 1000;
        
        // Check if force expiration has passed (7 days)
        if (decodedToken.force_exp && now > decodedToken.force_exp) {
          // Force logout after 7 days
          logout();
        } else if (decodedToken.exp && now < decodedToken.exp) {
          // Token still valid
          setUser({
            user_id: decodedToken.user_id,
            school_id: decodedToken.school_id,
            role: getRoleName(decodedToken.role),
            roleId: decodedToken.role,
          });
        } else {
          // Token expired, try to refresh
          refreshAccessToken(refreshToken);
        }
      }
    }
    setLoading(false);
  }, []);

  // Check force expiration periodically (every minute)
  useEffect(() => {
    const checkForceExpiration = () => {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        const decodedToken = decodeToken(accessToken);
        if (decodedToken && decodedToken.force_exp) {
          const now = Date.now() / 1000;
          if (now > decodedToken.force_exp) {
            // Force logout after 7 days
            logout();
            alert('Your session has expired. Please login again.');
            window.location.href = '/login';
          }
        }
      }
    };

    // Check immediately
    checkForceExpiration();

    // Check every minute
    const interval = setInterval(checkForceExpiration, 60000);

    return () => clearInterval(interval);
  }, [user]);

  const refreshAccessToken = async (refreshToken) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      const data = await response.json();

      if (response.ok && data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        const decodedToken = decodeToken(data.access_token);
        
        if (decodedToken) {
          setUser({
            user_id: decodedToken.user_id,
            school_id: decodedToken.school_id,
            role: getRoleName(decodedToken.role),
            roleId: decodedToken.role,
          });
        }
      } else {
        // Refresh failed, logout
        logout();
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
    }
  };

  const login = (accessToken, refreshToken) => {
    // Store tokens
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    
    // Decode access token to get user data
    const decodedToken = decodeToken(accessToken);
    
    if (decodedToken) {
      const userData = {
        user_id: decodedToken.user_id,
        school_id: decodedToken.school_id,
        role: getRoleName(decodedToken.role),
        roleId: decodedToken.role,
      };
      setUser(userData);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  const getAccessToken = () => {
    return localStorage.getItem('access_token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, getAccessToken, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
