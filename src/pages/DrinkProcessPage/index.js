import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';

import { CheckBox } from '../../components';

import { DrinksContext } from '../../contexts/DrinksContext';
import useLocalStorage from '../../hooks/localStorage';
import { getInProgress, setInProgress } from '../../services/APIs/APIlocalStorage';

function DrinkProcessPage({ id }) {
  const [{ drinkInProgress: { ingredients } }] = useContext(DrinksContext);
  const [usedIngredients, setUsedIngredients] = useLocalStorage(
    getInProgress('drink')[id] || [],
    (newUsed) => setInProgress('drink', id, newUsed),
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

DrinkProcessPage.propTypes = { id: PropTypes.number.isRequired };

export default DrinkProcessPage;
