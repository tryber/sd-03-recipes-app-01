import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';

import { CheckBox } from '../../components';

import { FoodsContext } from '../../contexts/FoodsContext';
import useLocalStorage from '../../hooks/localStorage';
import { getInProgress, setInProgress } from '../../services/APIs/APIlocalStorage';

function FoodProcessPage({ id }) {
  const [{ foodInProgress }] = useContext(FoodsContext);
  const { ingredients } = foodInProgress;
  const [usedIngredients, setUsedIngredients] = useLocalStorage(
    getInProgress('food')[id] || [],
    (newUsed) => setInProgress('food', id, newUsed),
  );

  const toogleCheckbox = useCallback(({ target: { value, checked } }) => {
    setUsedIngredients((used) => {
      if (checked) return [...used, Number(value)].sort((a, b) => a - b);
      return used.filter((usedIngredient) => usedIngredient !== Number(value));
    });
  }, [setUsedIngredients]);

  return (
    <div>
      <div>
        {ingredients && ingredients.map(({ ingredient }, index) => (
          <CheckBox
            key={ingredient}
            checked={usedIngredients.some((used) => used === index)}
            index={index}
            item={ingredient}
            handleChange={toogleCheckbox}
          />
        ))}
      </div>
    </div>
  );
}

FoodProcessPage.propTypes = { id: PropTypes.number.isRequired };

export default FoodProcessPage;
