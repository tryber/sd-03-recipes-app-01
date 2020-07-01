import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player/youtube';
import { Link } from 'react-router-dom';

import ShareIcon from './ShareIcon';
import FavoriteIcon from './FavoriteIcon';
import Card from './Card';

import { getInProgress, doneRecipes } from '../services/APIs/APIlocalStorage';
import {
  sendToFavoriteStorage,
  rmFromFavoriteStorage,
  takeFavStorage,
} from '../services/APIs/APIlocalStorage';
import { FoodsContext } from '../contexts/FoodsContext';

function StoreRecipe(id, ingredients, type) {
  const newStorage = {
    ...getInProgress(),
    [type === 'food' ? 'meals' : 'cocktails']: { ...getInProgress(type), [id]: ingredients },
  };
  localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
}

function DetailsCard({ eat, type }) {
  const [, { setFoodInproggress }] = useContext(FoodsContext);
  const { id, name, srcImage, video, category, ingredients, instructions, isAlcoholic } = eat;

  const startRecipe = useCallback(() => {
    setFoodInproggress(eat);
    StoreRecipe(eat.id, eat.ingredients, type);
  }, [eat, type]);

  const handleFavoriteStorage = useCallback((isToSend) => {
    if (isToSend) return sendToFavoriteStorage(eat, type);
    return rmFromFavoriteStorage(id);
  }, [type]);

  return (
    <div>
      <Card
        key={id}
        name={name}
        srcImage={srcImage}
        testid={{ title: 'recipe-title', img: 'recipe-photo' }}
      />
      <ShareIcon textToCopy={window.location.href} />
      <FavoriteIcon
        handleFavoriteChange={handleFavoriteStorage}
        isFavoriteInit={takeFavStorage().some((favorite) => Number(favorite.id) === Number(id))}
      />
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
      {doneRecipes(id) ||
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
