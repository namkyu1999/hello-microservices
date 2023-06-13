import React, { useState, ChangeEvent, useContext } from 'react';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { AuthContext, User } from '../../providers/auth';
import config from '../../config';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const setEmailValue = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const setPasswordValue = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const signUp = () => {
        fetch(`${config.auth.url}/api/v1/auth/register`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                alert('check your information'); // eslint-disable-line no-alert
                return response.json();
            })
            .then((user: User) => {
                if (user && setUser) {
                    setUser(user);
                    navigate('/');
                }
            })
            .catch((err) => {
                console.log(err.message); // eslint-disable-line no-console
            });
    };

    const loginWithEmailAndPassword = () => {
        fetch(`${config.auth.url}/api/v1/auth/authenticate`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                alert('check your information'); // eslint-disable-line no-alert
                return response.json();
            })
            .then((user: User) => {
                if (user && setUser) {
                    setUser(user);
                    navigate('/');
                }
            })
            .catch((err) => {
                console.log(err.message); // eslint-disable-line no-console
            });
    };

    return (
        <Card>
            <CardContent sx={{ '& .MuiTextField-root': { mb: 2 } }}>
                <TextField
                    id="filled-basic"
                    value={email}
                    onChange={setEmailValue}
                    fullWidth
                    label="Email"
                    variant="filled"
                />
                <TextField
                    id="filled-basic"
                    label="Password"
                    value={password}
                    fullWidth
                    type="password"
                    onChange={setPasswordValue}
                    variant="filled"
                />
            </CardContent>
            <CardActions>
                {/* <Button color="secondary" variant="text" onClick={signUp}> */}
                {/*    Signup */}
                {/* </Button> */}
                <Button variant="text" onClick={loginWithEmailAndPassword}>
                    Login
                </Button>
                <Button variant="text" onClick={signUp}>
                    SignUp
                </Button>
            </CardActions>
        </Card>
    );
}
