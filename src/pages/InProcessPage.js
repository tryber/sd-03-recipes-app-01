import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { CheckBox, Card, FavoriteIcon, ShareIcon, LinkBtn } from '../components';

import { fetchApis, handleDrinksData, handleFoodsData } from '../services/APIs/FOODS_API';

import useRequisition from '../hooks/requisition';
import useLocalStorage from '../hooks/localStorage';

import {
  getInProgress,
  setInProgress,
  rmInProgress,
  setDoneRecipeStorage,
} from '../services/APIs/APIlocalStorage';

const fetchAPI = async (type, id, setRecipe) => {
  if (type === 'food') {
    return fetchApis(`lookup.php?i=${id}`)
      .then(({ meals }) => setRecipe(handleFoodsData(meals[0])));
  } else if (type === 'drink') {
    return fetchApis(`lookup.php?i=${id}`)
      .then(({ drinks }) => setRecipe(handleDrinksData(drinks[0])));
  } return Promise.reject(`Type ${type} isn't valid`);
};

const endRecipe = (type, recipe) => () => {
  rmInProgress(type, recipe.id);
  setDoneRecipeStorage(recipe, type);
};

const changeCheckBox = (usedIng, checked, value) => {
  if (checked) return [...usedIng, Number(value)].sort((a, b) => a - b);
  return usedIng.filter((usedIngredient) => usedIngredient !== Number(value));
};

const setInProgressUse = (type, id) => (newUsed) => setInProgress(type, id, newUsed);

function InProcessPage({ id, type }) {
  const [recipe, setRecipe] = useState(null);
  const [{ loading, error }] = useRequisition(
    useCallback(() => fetchAPI(type, id, setRecipe), [type, id, setRecipe]),
  );
  const [usedIngredients, setUsedIngredients] = useLocalStorage(
    getInProgress(type)[id] || [],
    setInProgressUse(type, id),
  );

  const toggleCheckbox = useCallback(({ target: { value, checked } }) => {
    setUsedIngredients((usedIng) => changeCheckBox(usedIng, checked, value));
  }, [setUsedIngredients]);

  if (error) return <h1>Aconteceu algo errado em detalhes de bebidas em progresso</h1>;
  if (loading) return <h1>Carregando detalhes de bebidas em progresso...</h1>;

  const { name, srcImage, category, ingredients, instructions, isAlcoholic } = recipe;
  return (
    <div>
      <Card
        srcImage={srcImage}
        name={name}
        testid={{ title: 'recipe-title', img: 'recipe-photo' }}
      />
      <ShareIcon textToCopy={`${window.location.href.slice(0, -12)}`} testid="share-btn" />
      <FavoriteIcon recipe={recipe} type={type} />
      <p data-testid="recipe-category">{isAlcoholic || category}</p>
      <p data-testid="instructions">{instructions}</p>
      <div>
        {ingredients && ingredients.map(({ ingredient }, index) => (
          <CheckBox
            key={ingredient}
            checked={usedIngredients.some((used) => used === index)}
            index={index}
            item={ingredient}
            handleChange={toggleCheckbox}
          />
        ))}
      </div>
      <LinkBtn
        disabled={usedIngredients.length < ingredients.length}
        onClick={endRecipe(type, recipe)}
        testid="finish-recipe-btn"
        text="Finalizar receita"
        to="/receitas-feitas"
      />
    </div>
  );
}

InProcessPage.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['food', 'drink']).isRequired,
};

export default InProcessPage;
