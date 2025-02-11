import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    user: object;
    children: ReactElement;
}


const PrivateRoute: React.FC<PrivateRouteProps> = ({ user, children }) => {
    console.log(user, children)
    return (
        user && children ? children : <Navigate to="/" replace />
    );
}

export default PrivateRoute;

