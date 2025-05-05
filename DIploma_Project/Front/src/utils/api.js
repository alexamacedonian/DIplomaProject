/**
 * API client for making requests to the backend
 */
export const apiClient = {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @param {string} userData.email - User's email
   * @param {string} userData.username - User's username
   * @param {string} userData.password - User's password
   * @returns {Promise<Object>} - Response data
   */
  register: async (userData) => {
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  /**
   * Login user
   * @param {Object} credentials - User login credentials
   * @param {string} credentials.username - User's username or email
   * @param {string} credentials.password - User's password
   * @returns {Promise<Object>} - Response data with auth token
   */
  login: async (credentials) => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Login failed: ${response.status}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Add more API methods as needed
};

export default apiClient;
