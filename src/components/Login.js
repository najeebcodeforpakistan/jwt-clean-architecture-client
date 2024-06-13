// src/components/Login.js
import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import UAParser from 'ua-parser-js';
import { Link } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        ipaddress: '',
        device: '',
        browser: ''
    });

    useEffect(() => {
        const fetchDeviceInfo = async () => {
            try {
                const parser = new UAParser();
                const result = parser.getResult();
                console.log('Parsed device info:', result);

                const response = await axios.get('https://api.ipify.org?format=json');
                console.log('Fetched IP address:', response.data.ip);

                setFormData(prevState => ({
                    ...prevState,
                    ipaddress: response.data.ip,
                    device: result.device.model || result.os.name || 'unknown',
                    browser: result.browser.name || 'unknown'
                }));
            } catch (error) {
                console.error('Failed to fetch IP address or parse device info:', error);
            }
        };

        fetchDeviceInfo();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log('Submitting form with data:', formData);
            const res = await axios.post('/users/authenticate', formData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('firstName', res.data.firstName);
            localStorage.setItem('lastName', res.data.lastName);

            window.location.href = '/balance';
        } catch (error) {
            console.error('Authentication failed:', error);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box mt={5}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Login
                    </Button>
                </form>
                <Box mt={2}>
                    <Typography variant="body2">
                        Don't have an account? <Link to="/signup">Sign up</Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
