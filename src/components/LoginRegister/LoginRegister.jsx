import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import './LoginRegister.scss';

const LoginRegister = ({ onLogin }) => {
    const [isLoginView, setIsLoginView] = useState(true);

    const handleLogin = (email, password) => {
        console.log('Login attempt:', email, password); // Debug log
        if (email === 'opalmer1989@gmail.com' && password === 'test') {
            console.log('Login successful'); // Debug log
            onLogin(email);
        } else {
            console.log('Login failed'); // Debug log
            alert('Invalid credentials. Please try again.');
        }
    };

    const handleRegister = (userData) => {
        // For now, accept any registration data
        onLogin(userData.email);
    };

    const toggleView = () => {
        setIsLoginView(!isLoginView);
    };

    return (
        <div className="login-register-container">
            {isLoginView ? (
                <Login onLogin={handleLogin} />
            ) : (
                <Register onRegister={handleRegister} />
            )}
            <button onClick={toggleView} className="toggle-view-btn">
                {isLoginView ? 'Need an account? Register' : 'Already have an account? Login'}
            </button>
        </div>
    );
};

export default LoginRegister;