import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting:', email, password); // Debug log
        onLogin(email, password);
    };

    return (
           <div id="login-container">
            <h1 className="login-heading">Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <label htmlFor="email" className="input-label">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password" className="input-label">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                </div>
                <div className="login-button">
                    <button type="submit">Login</button>
                </div>
            </form>
            <div className="specialSigninButtons">
                <button id="google-sign-in" className="google-sign-in-button sign-in-button">Sign In with Google</button>
                <button id="apple-sign-in" className="apple-sign-in-button sign-in-button">Sign In with Apple</button>
            </div>
        </div>
    );
};

export default Login;