// src/components/Signup.js
import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import UAParser from 'ua-parser-js';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        device: '',
        ipaddress: ''
    });

    useEffect(() => {
        const fetchIpAndDevice = async () => {
            try {
                // Fetch the IP address using ipify API
                const ipRes = await axios.get('https://api.ipify.org?format=json');
                const ipaddress = ipRes.data.ip;

                // Get device and browser information
                const parser = new UAParser();
                const result = parser.getResult();
                console.log('Parsed device info:', result);

                const device = result.device.model || result.os.name || 'unknown';
                const browser = result.browser.name || 'unknown';

                setFormData((prevData) => ({
                    ...prevData,
                    ipaddress,
                    device: `${device} (${browser})`
                }));
            } catch (error) {
                console.error('Failed to fetch IP or device information:', error);
            }
        };

        fetchIpAndDevice();
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
            await axios.post('/users/signup', formData);
            window.location.href = '/login';
        } catch (error) {
            console.error('Signup failed:', error);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box mt={5}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Sign Up
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
                    <TextField
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Sign Up
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default Signup;
