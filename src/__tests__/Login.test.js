import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import Login from '../pages/LoginPage';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

function renderWithRoute(
  login,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{login}</ Router>),
    history,
  }
}

describe('Test Email Login', () => {
  afterEach(cleanup);

  test('Test input email', () => {
    const { getByTestId } = renderWithRoute(<Login />);
    const inputEmail = getByTestId("email-input");

    expect(inputEmail).toBeInTheDocument();
    fireEvent.change(inputEmail, { target: { value: "email@email.com" } });
    expect(inputEmail).toHaveValue("email@email.com");
  });

  test('Test input password ', () => {
    const { getByTestId } = renderWithRoute(<Login />);
    const inputPassword = getByTestId("password-input");

    expect(inputPassword).toBeInTheDocument();
    fireEvent.change(inputPassword, { target: { value: 6 } });
    expect(inputPassword).toHaveValue("6");
  });

  test('Test button enabled ', () => {
    const { getByTestId } = renderWithRoute(<Login />);
    const inputEmail = getByTestId("email-input");
    const inputPassword = getByTestId("password-input");
    const button = getByTestId("login-submit-btn");
    expect(button).toBeDisabled();

    fireEvent.change(inputEmail, { target: { value: "email@email.com" } });
    expect(inputEmail).toHaveValue("email@email.com");
    expect(button).toBeDisabled();
    fireEvent.change(inputPassword, { target: { value: 1234567 } });
    expect(button).not.toBeDisabled();
  });

  test('Test button disabled ', () => {
    const { getByTestId } = renderWithRoute(<Login />);
    const inputEmail = getByTestId("email-input");
    const inputPassword = getByTestId("password-input");
    const button = getByTestId("login-submit-btn");
    expect(button).toBeDisabled();

    fireEvent.change(inputEmail, { target: { value: "email@email.com" } });
    expect(inputEmail).toHaveValue("email@email.com");
    expect(button).toBeDisabled();
    fireEvent.change(inputPassword, { target: { value: 12345 } });
    expect(button).toBeDisabled();
  });
});
