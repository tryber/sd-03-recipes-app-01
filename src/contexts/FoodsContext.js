import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const FoodsContext = createContext();

export function FoodsProvider({ children }) {
  const [foods, setFoods] = useState([]);
  const [searchFilter, setSearchFilter] = useState("search.php?s=");
  const [foodInproggress, setFoodInproggress] = useState({});

  const state = {
    foods,
    searchFilter,
    foodInproggress,
  };

  const setState = {
    setFoods,
    setSearchFilter,
    setFoodInproggress,
  };

  return <FoodsContext.Provider value={[state, setState]}>{children}</FoodsContext.Provider>;
}

FoodsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
