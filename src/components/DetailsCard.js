import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';

import Card from './Card';
import Carrosel from './Carrosel';
import ActionsBar from './ActionsBar';
import { sendToFavoriteStorage, rmFromFavoriteStorage } from '../services/APIs/APIlocalStorage';
import { takeFavStorage } from '../services/APIs/APIlocalStorage';
import { FoodsContext } from '../contexts/FoodsContext';
import * as getAllApi from '../services/APIs/APIlocalStorage';

import { handleDrinksData } from '../services/APIs/DRINKS_API';
import { handleFoodsData, fetchRecomendations } from '../services/APIs/FOODS_API';

function ButtonFunc(props) {
  const { eat, type } = props;
  const { ingredients, id } = eat;
  const [, { setFoodInproggress }] = useContext(FoodsContext);
  const getIngre = getAllApi.getIngredients()[id];

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
    </Link>);
}

function DetailsCard({ eat, type }) {
  const [recomends, setRecomends] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const ifDone = getAllApi.doneRecipes().some((element) => element.id === Number(eat.id));

  useEffect(() => {
    let url = '';
    if (type === 'food') url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    if (type === 'drink') url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

    fetchRecomendations(url)
      .then((obj) => {
        let arr = [];
        Object.entries(obj).forEach(([key, value]) => {
          if (key === 'drinks') arr = value.slice(0, 6).map((drk) => handleDrinksData(drk));
          if (key === 'meals') arr = value.slice(0, 6).map((meal) => handleFoodsData(meal));
        });
        setRecomends(arr);
      }).then(() => setLoading(false))
      .catch((err) => { console.log(err); setError(err); });
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
      <ActionsBar
        handleFavorite={handleFavoriteStorage}
        isFavInit={takeFavStorage().some((favorite) => Number(favorite.id) === Number(id))}
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
  eat: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
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
    source: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(
      PropTypes.objectOf(
        PropTypes.string.isRequired,
      ).isRequired,
    ).isRequired,
    isAlcoholic: PropTypes.bool,
  }).isRequired,
  type: PropTypes.oneOf(['food', 'drink']).isRequired,
};

export default DetailsCard;
