import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { AuthContext } from '../../providers/auth';
import './header.css';
import config from '../../config';

export function Header() {
    const { user, signOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const headerText = location.pathname === '/login' ? 'LOGIN' : 'TODO';

    const logout = () => {
        fetch(`${config.auth.url}/api/v1/auth/logout`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${user?.access_token}`,
            },
        });
        signOut && signOut(); // eslint-disable-line no-unused-expressions
        navigate('/login');
    };

    return (
        <header>
            <Grid container justifyContent="right">
                {user ? (
                    <Button onClick={logout}>Logout</Button>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </Grid>
            <Grid container justifyContent="space-between" mt={5} mb={3}>
                <h1 className="app-header">{headerText}</h1>
            </Grid>
        </header>
    );
}
