import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import Provider from '../../contexts/Provider';

const renderWithContext = (children, route = '/') => {
  const initialEntries = [route];
  const history = createMemoryHistory({ initialEntries });
  return {
    ...render(
      <Router history={history}>
        <Provider>{children}</Provider>
      </Router>,
    ),
    history,
  };
};

export default renderWithContext;
