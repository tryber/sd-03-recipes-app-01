import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { CheckBox, Card, FavoriteIcon, ShareIcon, LinkBtn } from '../../components';

import { fetchDrinkApi, handleDrinksData } from '../../services/APIs/DRINKS_API';
import { fetchFoodsApi, handleFoodsData } from '../../services/APIs/FOODS_API';

import useRequisition from '../../hooks/requisition';
import useLocalStorage from '../../hooks/localStorage';

import {
  getInProgress,
  setInProgress,
  rmInProgress,
  setDoneRecipeStorage,
} from '../../services/APIs/APIlocalStorage';

const fetchAPI = async (type, id, setEat) => {
  if (type === 'food') {
    return fetchFoodsApi(`lookup.php?i=${id}`)
      .then(({ meals }) => setEat(handleFoodsData(meals[0])));
  } else if (type === 'drink') {
    return fetchDrinkApi(`lookup.php?i=${id}`)
      .then(({ drinks }) => setEat(handleDrinksData(drinks[0])));
  } return Promise.reject(`type ${type} insn't valid`);
};

const endRecipe = (type, eat) => () => {
  rmInProgress(type, eat.id);
  setDoneRecipeStorage(eat, type);
};

const changeCheckBox = (usedIng, checked, value) => {
  if (checked) return [...usedIng, Number(value)].sort((a, b) => a - b);
  return usedIng.filter((usedIngredient) => usedIngredient !== Number(value));
};

const setInProgressUse = (type, id) => (newUsed) => setInProgress(type, id, newUsed);

function InProcessPage({ id, type }) {
  const [eat, setEat] = useState(null);
  const [{ loading, error }] = useRequisition(
    useCallback(() => fetchAPI(type, id, setEat), [type, id, setEat]),
  );
  const [usedIngredients, setUsedIngredients] = useLocalStorage(
    getInProgress(type)[id] || [],
    setInProgressUse(type, id),
  );

  const toogleCheckbox = useCallback(({ target: { value, checked } }) => {
    setUsedIngredients((usedIng) => changeCheckBox(usedIng, checked, value));
  }, [setUsedIngredients]);

  if (error) return <h1>Aconteceu algo errado em detalhes de bebidas em progresso</h1>;
  if (loading) return <h1>Carrgando detalhes de bebidas em progresso...</h1>;

  const { name, srcImage, category, ingredients, instructions, isAlcoholic } = eat;
  return (
    <div>
      <Card
        srcImage={srcImage}
        name={name}
        testid={{ title: 'recipe-title', img: 'recipe-photo' }}
      />
      <ShareIcon textToCopy={`${window.location.href.slice(0, -12)}`} />
      <FavoriteIcon eat={eat} type={type} />
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
      <LinkBtn
        disabled={usedIngredients.length < ingredients.length}
        onClick={endRecipe(type, eat)}
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
