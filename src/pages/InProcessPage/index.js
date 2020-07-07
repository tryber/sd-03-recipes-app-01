import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { CheckBox, Card, FavoriteIcon, ShareIcon } from '../../components';


import { fetchDrinkApi, handleDrinksData } from '../../services/APIs/DRINKS_API';
import { fetchFoodsApi, handleFoodsData } from '../../services/APIs/FOODS_API';

import useRequisition from '../../hooks/requisition';
import useLocalStorage from '../../hooks/localStorage';

import {
  getInProgress,
  setInProgress,
  sendToFavoriteStorage,
  rmFromFavoriteStorage,
  takeFavStorage,
  rmInProgress,
  setDoneRecipeStorage,
} from '../../services/APIs/APIlocalStorage';
import { Redirect } from 'react-router-dom';

const fetchAPI = async (type, id, setEat) => {
  if (type === 'food') {
    return fetchFoodsApi(`lookup.php?i=${id}`)
    .then(({ meals }) => setEat(handleFoodsData(meals[0])));
  } else if (type === 'drink') {
    return fetchDrinkApi(`lookup.php?i=${id}`)
    .then(({ drinks }) => setEat(handleDrinksData(drinks[0])))
  }
};

function InProcessPage({ id, type }) {
  const [redirect, setRedirect] = useState(false);
  const [eat, setEat] = useState(null);
  const fetchDrink = useCallback(() => fetchAPI(type, id, setEat), [id, type, setEat]);
  const [{ loading, error }] = useRequisition(fetchDrink);
  const endRecipe = useCallback(() => {
    rmInProgress(type, id);
    setDoneRecipeStorage(id);
    setRedirect(true);
  }, []);
  const [usedIngredients, setUsedIngredients] = useLocalStorage(
    getInProgress(type)[id] || [],
    (newUsed) => setInProgress(type, id, newUsed),
  );

  const toogleCheckbox = useCallback(({ target: { value, checked } }) => {
    setUsedIngredients((usedIng) => {
      if (checked) return [...usedIng, Number(value)].sort((a, b) => a - b);
      return usedIng.filter((usedIngredient) => usedIngredient !== Number(value));
    });
  }, [setUsedIngredients]);

  const favoriteStorage = useCallback((isToSend) => {
    if (isToSend) return sendToFavoriteStorage(eat, type);
    return rmFromFavoriteStorage(eat.id);
  }, [eat]);

  const isFavInit = takeFavStorage().some((favorite) => Number(favorite.id) === Number(id));

  if (error) return <h1>Aconteceu algo errado em detalhes de bebidas em progresso</h1>;
  if (loading) return <h1>Carrgando detalhes de bebidas em progresso...</h1>;
  if (redirect) return <Redirect to="receitas-feitas" />

  const { name, srcImage, category, ingredients, instructions, isAlcoholic } = eat;
  return (
    <div>
      <Card srcImage={srcImage} name={name} />
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
      <button
        data-testid="finish-recipe-btn"
        disabled={usedIngredients.length < ingredients.length}
        onClick={endRecipe}
      >
        Finallizar Receita
      </button>
    </div>
  );
}

InProcessPage.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['food', 'drink']).isRequired,
};

export default InProcessPage;
