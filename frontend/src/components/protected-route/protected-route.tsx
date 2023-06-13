import React, { FC, ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../providers/auth';

type Props = {
    children: ReactNode;
};

export const ProtectedRoute: FC<Props> = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>; // eslint-disable-line react/jsx-no-useless-fragment
};
