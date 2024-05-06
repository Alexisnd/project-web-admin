import LoginForm from '@/components/forms/auth/LoginForm';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Iniciar sesión - Sistema administrativo'
};

const LoginPage = () => {

    return (
        <div className={`w-full min-h-screen flex align-items-center justify-content-center`}>
            <LoginForm/>
        </div>
    );
};

export default LoginPage;
