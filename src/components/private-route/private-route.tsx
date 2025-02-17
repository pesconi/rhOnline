import { Navigate } from 'react-router-dom';


import React, { ReactNode } from 'react';
import useAuth from '../../hooks/useAuth';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/" />;
    }

    return children ? <>{children}</> : null;
};

export default PrivateRoute;
