import React, { useState } from 'react';

const Register = ({ onRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email,
            password,
            firstName,
            lastName
        };
        console.log('Registering with:', userData); // Debug log
        onRegister(userData);
    };

    return (
      <div id="register-container">
<h1 className="register-heading">Register</h1>
        <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
  <label htmlFor="username" className="input-label">Username</label>
  <input
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                required
            />
</div>
<div className="input-wrapper">
  <label htmlFor="firstName" className="input-label">First Name</label>
  <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                required
            />
</div>
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
<div className="register-buttons">
            <button type="submit">Register</button>
            <div className="specialSigninButtons">
              <button id="google-sign-in" className="google-sign-in-button sign-in-button">Sign In with Google</button>
              <button id="apple-sign-in" className="apple-sign-in-button sign-in-button">Sign In with Apple</button>
            </div>
</div>
        </form>
      </div>
    );
};

export default Register;