import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';

import { CheckBox, Card, FavoriteIcon, ShareIcon } from '../../components';

import { DrinksContext } from '../../contexts/DrinksContext';
import useLocalStorage from '../../hooks/localStorage';
import {
  getInProgress,
  setInProgress,
  sendToFavoriteStorage,
  rmFromFavoriteStorage,
  takeFavStorage,
} from '../../services/APIs/APIlocalStorage';

function DrinkProcessPage({ id }) {
  const [{ drinkInProgress }] = useContext(DrinksContext);
  const { name, srcImage, category, ingredients, instructions, isAlcoholic } = drinkInProgress;
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

  const favoriteStorage = useCallback((isToSend) => {
    if (isToSend) return sendToFavoriteStorage(drinkInProgress, 'drink');
    return rmFromFavoriteStorage(drinkInProgress.id);
  }, [drinkInProgress]);

  const isFavInit = takeFavStorage().some((favorite) => Number(favorite.id) === Number(id));

  return (
    <div>
      <Card
        srcImage={srcImage}
        name={name}
        testid={{ title: 'recipe-title', img: 'recipe-photo' }}
      />
      <ShareIcon textToCopy={`${window.location.href.slice(0, -12)}`} />
      <FavoriteIcon handleFavoriteChange={favoriteStorage} isFavoriteInit={isFavInit} />
      <p data-testid="recipe-category">{isAlcoholic || category}</p>
      <p data-testid="instructions">{instructions}</p>
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
