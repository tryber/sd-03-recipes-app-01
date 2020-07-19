import React, { useState, useCallback as useCb } from 'react';
import { Button, Typography, Input } from '@material-ui/core';

const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isDisableBtn = password.length > 6 && emailRegex.test(email);

  const storage = useCb(() => localStorage.setItem('user', JSON.stringify({ email })), [email]);

  return (
    <center>
      <div className="Login">
        <Typography variant="h2">Recipe App</Typography>
        <div>
          <Input
            placeholder="Email"
            color="secondary"
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            required
          />
        </div>
        <div>
          <Input
            onChange={(event) => setPassword(event.target.value)}
            color="primary"
            placeholder="Senha"
            required
            type="password"
          />
        </div>
        <Button
          variant="outlined"
          color="primary"
          disabled={isDisableBtn}
          onClick={storage}
          href="/comidas"
        >
          Entrar
        </Button>
      </div>
    </center>
  );
}

export default LoginPage;
