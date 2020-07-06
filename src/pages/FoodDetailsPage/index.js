import React, { useState, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';

import { DetailsCard, Carrosel } from '../../components';
import { FoodsContext } from '../../contexts/FoodsContext';

import { fetchFoodsApi, handleFoodsData } from '../../services/APIs/FOODS_API';
import { fetchDrinkApi, handleDrinksData } from '../../services/APIs/DRINKS_API';
import useRequisition from '../../hooks/requisition';

function FoodDetailsPage({ id }) {
  const [, { setFoodInProgress }] = useContext(FoodsContext);
  const [food, setFood] = useState(null);
  const fetchFood = useCallback(() => fetchFoodsApi(`lookup.php?i=${id}`)
    .then(({ meals }) => setFood(handleFoodsData(meals[0]))), [setFood, id]);
  const [{ loading, error }] = useRequisition(fetchFood);

  const [recomends, setRecomends] = useState(null);
  const fetchRecomends = useCallback(() => (fetchDrinkApi()
    .then(({ drinks }) => setRecomends(drinks.slice(0, 6).map((drk) => handleDrinksData(drk))))
  ), []);
  const [{ loading: loadingRecom, error: errorRecom }] = useRequisition(fetchRecomends);

  if (error) return <h1>Aconteceu algo errado em detalhes de comida</h1>;
  if (loading) return <h1>Carrgando detalhes de comida...</h1>;
  return (
    <div>
      <DetailsCard type="food" eat={food} setInProgress={setFoodInProgress} />
      {errorRecom && <h3 data-testid="error-recom">Aconteceu algo errado em recomendações</h3>}
      {!errorRecom && loadingRecom && <h3>Carrgando detalhes de comida...</h3>}
      {!errorRecom && !loadingRecom && recomends && <Carrosel cards={recomends} />}
    </div>
  );
}

FoodDetailsPage.propTypes = {
  id: PropTypes.number.isRequired,
};

export default FoodDetailsPage;
