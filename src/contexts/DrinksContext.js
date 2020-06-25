import React, {
  createContext,
  useState,
} from 'react';
import PropTypes from 'prop-types';

export const DrinksContext = createContext();

export function DrinksProvider({
  children,
}) {
  const [drinks, setDrinks] = useState([]);

  const state = {
    drinks,
  };

  const setState = {
    setDrinks,
  };

  return (
    <DrinksContext.Provider value={[state, setState]}>
      {children}
    </DrinksContext.Provider>
  );
}

DrinksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
