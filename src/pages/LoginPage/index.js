import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailPassword = () => (
    password.length > 6 && /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)
  );

  const storage = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
  };

  return (
    <div className='backGround'>
      <h1>Login</h1>
      <input
        className="Buttons"
        placeholder="Email"
        data-testid="email-input"
        onChange={(event) => setEmail(event.target.value)}
        type="email"
        required
      />
      <input
        className="Buttons"
        data-testid="password-input"
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Senha"
        required
        type="password"
      />
      <Link to="./comidas">
        <button
          className="Buttons"
          type="button"
          disabled={!emailPassword()}
          data-testid="login-submit-btn"
          onClick={() => storage()}
        >
          Entrar
          </button>
      </Link>
    </div>
  );
}

export default LoginPage;
