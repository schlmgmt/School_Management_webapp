import { API_BASE_URL } from '../config/api';

/**
 * Make an authenticated API request with automatic token refresh
 * @param {string} endpoint - API endpoint path
 * @param {object} options - Fetch options (method, body, etc.)
 * @returns {Promise} - Response data
 */
export const apiClient = async (endpoint, options = {}) => {
  const accessToken = localStorage.getItem('access_token');
  
  // Add authorization header
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }
  
  // Make the request
  let response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
  
  // If token expired (401), try to refresh
  if (response.status === 401) {
    const refreshToken = localStorage.getItem('refresh_token');
    
    if (refreshToken) {
      try {
        // Try to refresh the token
        const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });
        
        const refreshData = await refreshResponse.json();
        
        if (refreshResponse.ok && refreshData.access_token) {
          // Store new access token
          localStorage.setItem('access_token', refreshData.access_token);
          
          // Retry original request with new token
          headers['Authorization'] = `Bearer ${refreshData.access_token}`;
          response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers,
          });
        } else {
          // Refresh failed, redirect to login
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
          throw new Error('Session expired. Please login again.');
        }
      } catch (error) {
        // Refresh failed, redirect to login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        throw error;
      }
    } else {
      // No refresh token, redirect to login
      window.location.href = '/login';
      throw new Error('Session expired. Please login again.');
    }
  }
  
  return response;
};

/**
 * GET request helper
 */
export const get = (endpoint) => {
  return apiClient(endpoint, { method: 'GET' });
};

/**
 * POST request helper
 */
export const post = (endpoint, data) => {
  return apiClient(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * PUT request helper
 */
export const put = (endpoint, data) => {
  return apiClient(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

/**
 * DELETE request helper
 */
export const del = (endpoint) => {
  return apiClient(endpoint, { method: 'DELETE' });
};
