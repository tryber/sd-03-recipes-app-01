import React, {
  createContext,
  useState,
} from 'react';
import PropTypes from 'prop-types';

export const FoodsContext = createContext();

export function FoodsProvider({ children }) {
  const [foods, setFoods] = useState([]);
  const [foodFilter, setFoodFilter] = useState('search.php?s=');
  const [foodInproggress, setFoodInproggress] = useState({});

  const state = {
    foods,
    foodFilter,
    foodInproggress,
  };

  const setState = {
    setFoods,
    setFoodFilter,
    setFoodInproggress,
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
