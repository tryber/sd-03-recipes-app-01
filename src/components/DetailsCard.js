import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player/youtube';
import { Link } from 'react-router-dom';

import Card from './Card';
import Carrosel from './Carrosel';
import FavoriteIcon from './FavoriteIcon';
import ShareIcon from './ShareIcon';

import {
  sendToFavoriteStorage,
  rmFromFavoriteStorage,
  takeFavStorage,
  getInProgress,
  doneRecipes,
} from '../services/APIs/APIlocalStorage';

import { FoodsContext } from '../contexts/FoodsContext';

import { handleDrinksData, fetchDrinksAPI } from '../services/APIs/DRINKS_API';
import { handleFoodsData, fetchFoodsApi } from '../services/APIs/FOODS_API';

function ButtonFunc(props) {
  const { eat, type } = props;
  const { ingredients, id } = eat;
  const [, { setFoodInproggress }] = useContext(FoodsContext);
  const getIngre = getInProgress()[id];

  function getIngredients() {
    const ignt = JSON.parse(localStorage.getItem('inProggressRecipes')) || {};
    localStorage.setItem('inProggressRecipes', JSON.stringify({
      ...ignt,
      [id]: ingredients
        .reduce((acc, elIngredients) => {
          const obj = { ...acc, [elIngredients.ingredient]: false };
          return obj;
        }, {}),
    }));
    setFoodInproggress(eat);
  }

  return (
    <Link to={`${type === 'food' ? '/comidas' : '/bebidas'}/${id}/in-progress`}>
      <button
        data-testid="start-recipe-btn"
        className="buttonIniciar"
        onClick={() => getIngredients()}
      >{getIngre ? 'Continuar Receita' : 'Iniciar Receita'}</button>
    </Link>
  );
}

function DetailsCard({ eat, type }) {
  const [recomends, setRecomends] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const ifDone = doneRecipes().some((element) => element.id === Number(eat.id));

  useEffect(() => {
    if (type === 'food') {
      fetchDrinksAPI()
        .then((obj) => obj.drinks.slice(0, 6).map((drk) => handleDrinksData(drk)))
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

  const {
    id,
    name,
    srcImage,
    video,
    category,
    ingredients,
    instructions,
    isAlcoholic,
  } = eat;

  const handleFavoriteStorage = (isToSend) => {
    if (isToSend) return sendToFavoriteStorage(eat, type);
    return rmFromFavoriteStorage(id);
  };

  return (
    <div>
      <Card
        key={id}
        name={name}
        index={-100}
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
      <p data-testid="instructions">{instructions.replace(/\r\n/g, ' ')}</p>
      {video && <div data-testid="video"><ReactPlayer url={video} /></div>}
      {error && <h3 data-testid="error-details">Aconteceu algo errado em recomendações</h3>}
      {!error && loading && <h3>Carrgando detalhes de comida...</h3>}
      {!error && !loading && recomends && <Carrosel cards={recomends} />}
      {ifDone ||
        <ButtonFunc eat={eat} type={type} />
      }
    </div>
  );
}

ButtonFunc.propTypes = {
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

ButtonFunc.defaultProps = {
  eat: { source: null, isAlcoholic: null },
};

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
