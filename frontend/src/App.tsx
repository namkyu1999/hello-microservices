import './App.css';
import { Outlet } from 'react-router-dom';
import { Header } from './components/header';
import Container from '@mui/material/Container';

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
