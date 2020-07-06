import React, {
  createContext,
  useState,
} from 'react';
import PropTypes from 'prop-types';

export const FoodsContext = createContext();

export function FoodsProvider({ children }) {
  const [foods, setFoods] = useState([]);
  const [foodFilter, setFoodFilter] = useState('search.php?s=');
  const [foodInProgress, setFoodInProgress] = useState({});

  const state = {
    foods,
    foodFilter,
    foodInProgress,
  };

  const setState = {
    setFoods,
    setFoodFilter,
    setFoodInProgress,
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
