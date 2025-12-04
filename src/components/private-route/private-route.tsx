import { Navigate } from 'react-router-dom';


import React, { ReactNode } from 'react';
import useAuth from '../../hooks/useAuth';
import Header from '../header/header';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth();


    if (!user) {
        return <Navigate to="/" />;
    }

    return (
        children ?
            <div className="private-route">
                <Header />
                {children}
            </div>
            :
            null
    );
};

export default PrivateRoute;
