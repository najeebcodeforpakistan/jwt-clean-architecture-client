// src/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://localhost:7001', // Replace with your backend API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;
