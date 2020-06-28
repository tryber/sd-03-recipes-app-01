import React, {
  createContext,
  useState,
} from 'react';
import PropTypes from 'prop-types';

export const FoodsContext = createContext();

export function FoodsProvider({ children }) {
  const [foods, setFoods] = useState([]);
  const [searchFilter, setSearchFilter] = useState('s=');

  const state = {
    foods,
    searchFilter,
  };

  const setState = {
    setFoods,
    setSearchFilter,
  };

  return (
    <FoodsContext.Provider value={[state, setState]}>
      {children}
    </FoodsContext.Provider>
  );
}

FoodsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
