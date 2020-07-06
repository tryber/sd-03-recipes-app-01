import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';

import Card from './Card';
import Carrosel from './Carrosel';
import ActionsBar from './ActionsBar';
import { getFavStorage, sendToFavoriteStorage, rmFromFavoriteStorage } from '../services/APIs/APIlocalStorage';
import { FoodsContext } from '../contexts/FoodsContext';

import { getInProgress, doneRecipes } from '../services/APIs/APIlocalStorage';

import ActionsBar from './ActionsBar';

import { FoodsContext } from '../contexts/FoodsContext';

function DetailsCard({ eat, type }) {
  const [, { setFoodInproggress }] = useContext(FoodsContext);
  const { id, name, srcImage, video, category, ingredients, instructions, isAlcoholic } = eat;

  const handleFavoriteStorage = (toBeSent) => {
    if (toBeSent) return sendToFavoriteStorage(eat, type);
    return rmFromFavoriteStorage(id);
  };
 
  const startRecipe = useCallback(() => {
    setFoodInproggress(eat);
  }, [eat, type, setFoodInproggress]);

  return (
    <div>
      <Card
        key={id}
        name={name}
        srcImage={srcImage}
        testid={{ title: 'recipe-title', img: 'recipe-photo' }}
      />
      <ActionsBar eat={eat} type={type} />
      <p data-testid="recipe-category">{isAlcoholic || category}</p>
      <ul>
        {ingredients.map(({ ingredient, measure }, index) => (
          <li data-testid={`${index}-ingredient-name-and-measure`} key={ingredient}>
            {ingredient} {measure}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{instructions}</p>
      {video && <div data-testid="video"><ReactPlayer url={video} /></div>}
      {Boolean(doneRecipes(id)) ||
        <Link to={`${type === 'food' ? '/comidas' : '/bebidas'}/${id}/in-progress`}>
          <button
            data-testid="start-recipe-btn"
            className="buttonIniciar"
            onClick={startRecipe}
          >{getInProgress(type)[id] ? 'Continuar Receita' : 'Iniciar Receita'}</button>
        </Link>
      }
    </div>
  );
}

DetailsCard.propTypes = {
  eat: PropTypes.shape({
    id: PropTypes.string.isRequired, // number as string
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    instructions: PropTypes.string.isRequired,
    origin: PropTypes.string,
    srcImage: PropTypes.string.isRequired,
    video: PropTypes.string,
    source: PropTypes.string,
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        ingredient: PropTypes.string.isRequired,
        measure: PropTypes.string,
      }).isRequired,
    ).isRequired,
    isAlcoholic: PropTypes.string,
  }).isRequired,
  type: PropTypes.oneOf(['food', 'drink']).isRequired,
};

DetailsCard.defaultProps = {
  eat: { source: null, isAlcoholic: null, origin: '', video: '' },
};

export default DetailsCard;
