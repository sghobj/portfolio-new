import axios from 'axios';
// const BASE_URL = 'http://localhost:1337'
const BASE_URL = 'https://portfolio-sg-backend-32352640bab2.herokuapp.com/'
// Create an Axios instance with default configuration
const axiosInstance = axios.create({
    baseURL: BASE_URL, // Replace with your Strapi backend URL
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // Timeout in ms (optional)
});

// You can set custom headers here, if required (for example, Authorization)
axiosInstance.interceptors.request.use(
    (config) => {
        // Add any headers if needed, like authorization
        const token = localStorage.getItem('auth_token'); // For example, JWT token
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Export the Axios instance to be used across your app
export default axiosInstance;
