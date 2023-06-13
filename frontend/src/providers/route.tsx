import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import { HomePage } from '../components/home-page';
import { LoginPage } from '../components/login-page';
import { ProtectedRoute } from '../components/protected-route';
import { StatusPage } from '../components/status-page';

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
            {
                path: '/status',
                element: <StatusPage />,
            },
        ],
    },
]);

export function AppRouterProvider() {
    return <RouterProvider router={router} />;
}
