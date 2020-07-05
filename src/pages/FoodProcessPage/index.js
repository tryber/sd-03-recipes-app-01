import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';

import { CheckBox } from '../../components';

import { FoodsContext } from '../../contexts/FoodsContext';
import { useLocalStorage } from '../../hooks/localStorage';
import { getInProgress, setInProgress } from '../../services/APIs/APIlocalStorage';

function FoodProcessPage({ id }) {
  const [{ foodInproggress: { ingredients } }] = useContext(FoodsContext);
  const [usedIngredients, setUsedIngredients] = useLocalStorage(
    getInProgress('food')[id] || [],
    (newUsed) => setInProgress('meals', id, newUsed)
  );
  
  const toogleCheckbox = useCallback((index, checked) => {
    setUsedIngredients(checked
      ? usedIngredients.filter((used) => used === index)
      : [ ...usedIngredients, index].sort((a, b) => a - b)
    );
  }, [usedIngredients]);
  
  return (
    <div>
      <div>
      {ingredients && ingredients.map(({ ingredient }, index) => (
        <CheckBox
          key={ingredient}
          checked={usedIngredients.some((used) => used === index)}
          index={index}
          item={ingredient}
          handleClick={toogleCheckbox}
        />
      ))}
      </div>
    </div>
  );
}

FoodProcessPage.propTypes = { id: PropTypes.number.isRequired };

export default FoodProcessPage;
