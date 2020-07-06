import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';

import { CheckBox, Card, FavoriteIcon, ShareIcon } from '../../components';

import { FoodsContext } from '../../contexts/FoodsContext';
import useLocalStorage from '../../hooks/localStorage';
import {
  getInProgress,
  setInProgress,
  sendToFavoriteStorage,
  rmFromFavoriteStorage,
  takeFavStorage,
} from '../../services/APIs/APIlocalStorage';

function FoodProcessPage({ id }) {
  const [{ foodInProgress }] = useContext(FoodsContext);
  const { name, srcImage, category, ingredients, instructions, isAlcoholic } = foodInProgress;

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

  const favoriteStorage = useCallback((isToSend) => {
    if (isToSend) return sendToFavoriteStorage(foodInProgress, 'food');
    return rmFromFavoriteStorage(id);
  }, [foodInProgress, id]);

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

FoodProcessPage.propTypes = { id: PropTypes.number.isRequired };

export default FoodProcessPage;
