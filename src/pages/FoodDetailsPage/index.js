import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { DetailsCard, FavoriteIcon, ShareIcon, Card, Carrosel } from '../../components';
import {
  sendToFavoriteStorage,
  rmFromFavoriteStorage,
  takeFavStorage,
} from '../../services/APIs/APIlocalStorage';
import { fetchFoodsApi, handleFoodsData } from '../../services/APIs/FOODS_API';
import { fetchDrinkApi, handleDrinksData } from '../../services/APIs/DRINKS_API';
import useRequisition from '../../hooks/requisition';

function FoodDetailsPage({ id }) {
  const [food, setFood] = useState({});
  const fetchFood = () => fetchFoodsApi(`lookup.php?i=${id}`)
    .then((obj) => {console.log(obj); setFood(handleFoodsData(obj.meals[0]))});
  const [{ loading, error }] = useRequisition(fetchFood);

  const [recomends, setRecomends] = useState(null);
  const fetchRecomends = () => fetchDrinkApi()
    .then(({ drinks }) => setRecomends(drinks.slice(0, 6).map((drk) => handleDrinksData(drk))))
  const [{ loadingRecom, errorRecom }] = useRequisition(fetchRecomends);

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
      {errorRecom && <h3 data-testid="error-details">Aconteceu algo errado em recomendações</h3>}
      {!errorRecom && loadingRecom && <h3>Carrgando detalhes de comida...</h3>}
      {!errorRecom && !loadingRecom && recomends && <Carrosel cards={recomends} />}
    </div>
  );
}

FoodDetailsPage.propTypes = {
  id: PropTypes.number.isRequired,
};

export default FoodDetailsPage;
