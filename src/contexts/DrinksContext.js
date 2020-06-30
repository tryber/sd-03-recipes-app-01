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
  const [searchFilter, setSearchFilter] = useState('search.php?s=');

  const state = {
    drinks,
    searchFilter,
  };

  const setState = {
    setDrinks,
    setSearchFilter,
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
