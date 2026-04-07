import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
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
    1: 'super-admin',
    2: 'admin',
    3: 'teacher',
    4: 'student',
  };
  return roleMap[roleId] || 'student';
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const refreshTokenInProgress = useRef(false);
  const pendingRefreshPromise = useRef(null);

  useEffect(() => {
    // Check for saved tokens in localStorage
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    console.log('AuthContext init - Access token exists:', !!accessToken, 'Refresh token exists:', !!refreshToken);
    
    if (accessToken && refreshToken) {
      const decodedToken = decodeToken(accessToken);
      
      if (decodedToken) {
        const now = Date.now() / 1000;
        
        // Check if force expiration has passed (7 days)
        if (decodedToken.force_exp && now > decodedToken.force_exp) {
          console.log('Force expiration reached');
          logout();
        } else if (decodedToken.exp && now < decodedToken.exp) {
          // Token still valid
          console.log('Token is still valid');
          setUser({
            user_id: decodedToken.user_id,
            school_id: decodedToken.school_id,
            role: getRoleName(decodedToken.role),
            roleId: decodedToken.role,
            name: decodedToken.name || 'User',
          });
        } else {
          // Token expired, try to refresh
          console.log('Token expired, attempting refresh');
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
            console.log('Force expiration detected in periodic check');
            logout();
            alert('Your session has expired. Please login again.');
            window.location.href = '/login';
          }
        }
      }
    };

    checkForceExpiration();
    const interval = setInterval(checkForceExpiration, 60000);
    return () => clearInterval(interval);
  }, [user]);

  const refreshAccessToken = useCallback(async (refreshToken) => {
    // If refresh is already in progress, wait for it
    if (refreshTokenInProgress.current) {
      console.log('Refresh already in progress, waiting...');
      return pendingRefreshPromise.current;
    }

    refreshTokenInProgress.current = true;
    pendingRefreshPromise.current = new Promise(async (resolve, reject) => {
      try {
        console.log('Starting token refresh with refresh token');
        const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });

        const data = await response.json();
        console.log('Refresh response status:', response.status);

        if (response.ok && data.access_token) {
          console.log('Token refreshed successfully');
          localStorage.setItem('access_token', data.access_token);
          
          // Update refresh token if provided
          if (data.refresh_token) {
            localStorage.setItem('refresh_token', data.refresh_token);
          }
          
          const decodedToken = decodeToken(data.access_token);
          
          if (decodedToken) {
            setUser({
              user_id: decodedToken.user_id,
              school_id: decodedToken.school_id,
              role: getRoleName(decodedToken.role),
              roleId: decodedToken.role,
              name: decodedToken.name || 'User',
            });
          }
          resolve(data.access_token);
        } else {
          console.log('Refresh failed, logging out');
          logout();
          reject(new Error('Token refresh failed'));
        }
      } catch (error) {
        console.error('Token refresh error:', error);
        logout();
        reject(error);
      } finally {
        refreshTokenInProgress.current = false;
      }
    });

    return pendingRefreshPromise.current;
  }, []);

  const login = (accessToken, refreshToken) => {
    console.log('Login called with tokens');
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    
    const decodedToken = decodeToken(accessToken);
    
    if (decodedToken) {
      const roleName = getRoleName(decodedToken.role);
      console.log('Login - Decoded token role ID:', decodedToken.role, 'Role name:', roleName);
      
      const userData = {
        user_id: decodedToken.user_id,
        school_id: decodedToken.school_id,
        role: roleName,
        roleId: decodedToken.role,
        name: decodedToken.name || 'User',
      };
      
      console.log('Login - User data:', userData);
      setUser(userData);
    }
  };

  const logout = () => {
    console.log('Logout called');
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
