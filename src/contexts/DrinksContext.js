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
  const [drinkInProgress, setDrinkInProgress] = useState({});

  const state = {
    drinks,
    drinkFilter,
    drinkInProgress,
  };

  const setState = {
    setDrinks,
    setDrinkFilter,
    setDrinkInProgress,
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
