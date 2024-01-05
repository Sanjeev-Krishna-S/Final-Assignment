// Login.jsx
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../elements/login.css';

const Login = ({ setIsAdmin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(null);

  const handleLogin = () => {
    if (username === 'admin@example.com' && password === 'admin') {
      setIsAdmin(true);
      setRedirect('/admin');
    } else if (username === 'user@example.com' && password === 'user') {
      setIsAdmin(false);
      setRedirect('/list');
    }
  };
  

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Login</h2>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
