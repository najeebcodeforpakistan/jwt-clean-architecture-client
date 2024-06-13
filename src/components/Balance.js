// src/components/Balance.js
import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { Container, Typography, Box, Card, CardContent, Button } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Balance = () => {
    const [balance, setBalance] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        const fetchBalance = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                window.location.href = '/login';
                return;
            }

            setFirstName(localStorage.getItem('firstName'));
            setLastName(localStorage.getItem('lastName'));

            try {
                const res = await axios.post('/users/auth/balance', {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setBalance(res.data.balance);
            } catch (error) {
                console.error('Failed to fetch balance:', error);
                window.location.href = '/login';
            }
        };

        fetchBalance();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        window.location.href = '/login';
    };

    return (
        <Container maxWidth="xs">
            <Box mt={5}>
                <Card>
                    <CardContent>
                        <Typography variant="h4" component="h3" gutterBottom>
                            User Dashboard
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            First Name: {firstName}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Last Name: {lastName}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Your GBP balance is: {balance !== null ? balance : 'Loading...'}
                        </Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<ExitToAppIcon />}
                            onClick={handleLogout}
                            fullWidth
                        >
                            Logout
                        </Button>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default Balance;
