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
  const [drinkFilter, setDrinkFilter] = useState('search.php?s=');

  const state = {
    drinks,
    drinkFilter,
  };

  const setState = {
    setDrinks,
    setDrinkFilter,
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
