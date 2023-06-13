import './App.css';
import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import React from 'react';
import { Header } from './components/header';

function App() {
    return (
        <Container maxWidth="sm">
            <Header />
            <main>
                <Outlet />
            </main>
        </Container>
    );
}

export default App;
