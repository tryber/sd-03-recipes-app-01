import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

import Card from './Card';
import Carrosel from './Carrosel';
import ActionsBar from './ActionsBar';
import { sendToFavoriteStorage, rmFromFavoriteStorage } from '../services/APIs/APIlocalStorage';
import { takeFavStorage } from '../services/APIs/APIlocalStorage';

import { handleDrinksData } from '../services/APIs/DRINKS_API';
import { handleFoodsData } from '../services/APIs/FOODS_API';

function DetailsCard({ eat, type }) {
  const [recomends, setRecomends] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let url = '';
    if (type === 'food') url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    if (type === 'drink') url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

    fetch(url).then((res) => res.json())
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
        isFavInit={takeFavStorage().some((favorite) => favorite.id === id)}
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
      {error.length > 0 && <h3>Aconteceu algo errado em detalhes de comida</h3>}
      {!error && loading && <h3>Carrgando detalhes de comida...</h3>}
      {!error && !loading && recomends && <Carrosel cards={recomends} />}
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
