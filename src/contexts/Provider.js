import React from 'react';
import PropTypes from 'prop-types';
import { FoodsProvider } from './FoodsContext';
import { DrinksProvider } from './DrinksContext';

function Provider({ children }) {
  return (
    <FoodsProvider>
      <DrinksProvider>
        {children}
      </DrinksProvider>
    </FoodsProvider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
