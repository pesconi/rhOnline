import { useState, useEffect } from 'react';
import api from '../services/api';

export interface ICredentials {
    user: string;
    password: string;
    cd_cliente: number;
}
export interface IUser {
    id_usuario: number;
    nr_cpf: string;
    senha: string;
    no_usuario: string;
    email: string;
    ativo: number;
    ativo_dt: string;
}

interface ILoginResponse {
    user: IUser;
    completaCadastro: boolean;
    token: string;
    message?: string;

}

const useAuth = () => {
    const [user, setUser] = useState<IUser | null>(() => {
        // Fetch user data from localStorage
        const userData = localStorage.getItem('user');
        return userData ? JSON.parse(userData) : null;
    });

    useEffect(() => {
        // Update user data if it changes in localStorage
        const handleStorageChange = () => {
            const userData = localStorage.getItem('user');
            setUser(userData ? JSON.parse(userData) : null);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleSignIn = async (credentials: ICredentials) => {
        try {
            const response = await api.post<ILoginResponse>('/login', credentials);
            const data = response.data;
            if (response.status === 200) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                setUser(data.user);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error during sign-in:', error);
        }
    };
    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return { user, handleSignIn, handleLogout };
};

export default useAuth;
