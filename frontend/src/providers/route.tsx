import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import { HomePage } from '../components/home-page';
import { LoginPage } from '../components/login-page';
import { ProtectedRoute } from '../components/protected-route';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: (
                    <ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/login',
                element: <LoginPage />,
            },
        ],
    },
]);

export const AppRouterProvider = () => {
    return <RouterProvider router={router} />;
};
