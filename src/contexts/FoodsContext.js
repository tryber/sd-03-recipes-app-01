import React, {
  createContext,
  useState,
} from 'react';
import PropTypes from 'prop-types';

export const FoodsContext = createContext();

export function FoodsProvider({ children }) {
  const [foods, setFoods] = useState([]);
  const [foodInproggress, setFoodInproggress] = useState({});

  const state = {
    foods,
    foodInproggress,
  };

  const setState = {
    setFoods,
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
