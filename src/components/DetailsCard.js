import React, { useState, useEffect, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player/youtube';
import { Link } from 'react-router-dom';

import Carrosel from './Carrosel';

import { getInProgress, doneRecipes } from '../services/APIs/APIlocalStorage';

import { FoodsContext } from '../contexts/FoodsContext';

import { handleDrinksData, fetchDrinkApi } from '../services/APIs/DRINKS_API';
import { handleFoodsData, fetchFoodsApi } from '../services/APIs/FOODS_API';

function StoreRecipe(id, ingredients, storedRecipes) {
  const newStorage = {
    ...storedRecipes,
    [id]: ingredients.reduce((acc, { ingredient }) => ({ ...acc, [ingredient]: false }), {}),
  };
  localStorage.setItem('inProggressRecipes', JSON.stringify(newStorage));
}

function DetailsCard({ eat, type }) {
  const [recomends, setRecomends] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const storedInprogress = getInProgress(type);
  const [, { setFoodInproggress }] = useContext(FoodsContext);

  useEffect(() => {
    if (type === 'food') {
      fetchDrinkApi()
        .then(({ drinks }) => drinks.slice(0, 6).map((drk) => handleDrinksData(drk)))
        .then((arr) => setRecomends(arr))
        .then(() => setLoading(false))
        .catch((err) => { console.log(err); setError(err); });
    } else if (type === 'drinks') {
      fetchFoodsApi()
      .then(({ meals }) => meals.slice(0, 6).map((meal) => handleFoodsData(meal)))
      .then((arr) => setRecomends(arr))
      .then(() => setLoading(false))
      .catch((err) => { console.log(err); setError(err); });
    }
  }, [type]);

  const { id, video, category, ingredients, instructions, isAlcoholic } = eat;

  const startRecipe = useCallback(() => {
    setFoodInproggress(eat);
    StoreRecipe(eat.id, eat.ingredients, storedInprogress);
  }, [eat, type]);

  return (
    <div>
      <p data-testid="recipe-category">{isAlcoholic || category}</p>
      <ul>
        {ingredients.map(({ ingredient, measure }, index) => (
          <li data-testid={`${index}-ingredient-name-and-measure`} key={ingredient}>
            {ingredient} {measure}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{instructions.replace(/\r\n/g, ' ')}</p>
      {video && <div data-testid="video"><ReactPlayer url={video} /></div>}

      {error && <h3 data-testid="error-details">Aconteceu algo errado em recomendações</h3>}
      {!error && loading && <h3>Carrgando detalhes de comida...</h3>}
      {!error && !loading && recomends && <Carrosel cards={recomends} />}

      {doneRecipes(id) ||
        <Link to={`${type === 'food' ? '/comidas' : '/bebidas'}/${id}/in-progress`}>
          <button
            data-testid="start-recipe-btn"
            className="buttonIniciar"
            onClick={startRecipe}
          >{storedInprogress[id] ? 'Continuar Receita' : 'Iniciar Receita'}</button>
        </Link>
      }
    </div>
  );
}

// ButtonFunc.propTypes = {
//   eat: PropTypes.shape({
//     id: PropTypes.string.isRequired, // number as string
//     name: PropTypes.string.isRequired,
//     category: PropTypes.string.isRequired,
//     instructions: PropTypes.string.isRequired,
//     origin: PropTypes.string.isRequired,
//     srcImage: PropTypes.string.isRequired,
//     video: PropTypes.string.isRequired,
//     source: PropTypes.string,
//     ingredients: PropTypes.arrayOf(
//       PropTypes.objectOf(
//         PropTypes.string.isRequired,
//       ).isRequired,
//     ).isRequired,
//     isAlcoholic: PropTypes.bool,
//   }).isRequired,
//   type: PropTypes.oneOf(['food', 'drink']).isRequired,
// };

// ButtonFunc.defaultProps = {
//   eat: { source: null, isAlcoholic: null },
// };

DetailsCard.propTypes = {
  eat: PropTypes.shape({
    id: PropTypes.string.isRequired, // number as string
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    instructions: PropTypes.string.isRequired,
    origin: PropTypes.string.isRequired,
    srcImage: PropTypes.string.isRequired,
    video: PropTypes.string.isRequired,
    source: PropTypes.string,
    ingredients: PropTypes.arrayOf(
      PropTypes.objectOf(
        PropTypes.string.isRequired,
      ).isRequired,
    ).isRequired,
    isAlcoholic: PropTypes.bool,
  }).isRequired,
  type: PropTypes.oneOf(['food', 'drink']).isRequired,
};

DetailsCard.defaultProps = {
  eat: { source: null, isAlcoholic: null },
};

export default DetailsCard;
