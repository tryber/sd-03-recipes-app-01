import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { DetailsCard, FavoriteIcon, ShareIcon, Card } from '../../components';
import {
  sendToFavoriteStorage,
  rmFromFavoriteStorage,
  takeFavStorage,
} from '../../services/APIs/APIlocalStorage'
import { fetchFoodsApi, handleFoodsData } from '../../services/APIs/FOODS_API';

function FoodDetailsPage({ id }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [food, setFood] = useState(null);

  useEffect(() => {
    fetchFoodsApi(`lookup.php?i=${id}`)
      .then(({ meals }) => setFood(handleFoodsData(meals[0])))
      .then(() => setLoading(false))
      .catch((err) => { console.log(err); setError(err); });
  }, [id, setError, setFood, setLoading]);

  const handleFavoriteStorage = useCallback((isToSend) => {
    if (isToSend) return sendToFavoriteStorage(food, 'food');
    return rmFromFavoriteStorage(food.id);
  }, [food]);

  if (error) return <h1>Aconteceu algo errado em detalhes de comida</h1>;
  if (loading) return <h1>Carrgando detalhes de comida...</h1>;
  return (
    <div>
      <Card
        key={id}
        name={food.name}
        srcImage={food.srcImage}
        testid={{ title: 'recipe-title', img: 'recipe-photo' }}
      />
      <ShareIcon textToCopy={window.location.href} />
      <FavoriteIcon
        handleFavoriteChange={handleFavoriteStorage}
        isFavoriteInit={takeFavStorage().some((favorite) => Number(favorite.id) === Number(id))}
      />
      <DetailsCard type="food" eat={food} />
    </div>
  );
}

FoodDetailsPage.propTypes = {
  id: PropTypes.number.isRequired,
};

export default FoodDetailsPage;
