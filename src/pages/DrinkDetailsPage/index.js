import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { DetailsCard, ShareIcon, FavoriteIcon, Card } from '../../components';
import {
  sendToFavoriteStorage,
  rmFromFavoriteStorage,
  takeFavStorage,
} from '../../services/APIs/APIlocalStorage';
import { fetchDrinkApi, handleDrinksData } from '../../services/APIs/DRINKS_API';

function DrinkDetailsPage({ id }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [drink, setDrink] = useState(null);

  useEffect(() => {
    fetchDrinkApi(`lookup.php?i=${id}`)
      .then(({ drinks: drk }) => setDrink(handleDrinksData(drk[0])))
      .then(() => setLoading(false))
      .catch((err) => { console.log(err); setError(err); });
  }, [id, setError, setDrink, setLoading]);

  const handleFavoriteStorage = useCallback((isToSend) => {
    if (isToSend) return sendToFavoriteStorage(drink, 'drink');
    return rmFromFavoriteStorage(drink.id);
  }, [drink]);

  if (error) return <h1>Aconteceu algo errado em detalhes de bebidas 1</h1>;
  if (loading) return <h1>Carrgando detalhes de bebidas...</h1>;
  return (
    <div>
      <Card
        key={id}
        name={drink.name}
        srcImage={drink.srcImage}
        testid={{ title: 'recipe-title', img: 'recipe-photo' }}
      />
      <ShareIcon textToCopy={window.location.href} />
      <FavoriteIcon
        handleFavoriteChange={handleFavoriteStorage}
        isFavoriteInit={takeFavStorage().some((favorite) => Number(favorite.id) === Number(id))}
      />
      <DetailsCard type="drink" eat={drink} />
    </div>
  );
}

DrinkDetailsPage.propTypes = {
  id: PropTypes.number.isRequired,
};

export default DrinkDetailsPage;
