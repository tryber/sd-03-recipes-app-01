import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Provider from '../contexts/Provider';

export const renderWithRouterContext = (children, route = '/') => {
  const initialEntries = [route];
  const history = createMemoryHistory({ initialEntries });
  return {
    ...render(
      <Router history={history}>
        <Provider>{children}</Provider>
      </Router>
    ),
    history,
  };
};

export default renderWithRouterContext;
