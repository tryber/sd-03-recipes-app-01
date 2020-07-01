import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { DetailsCard, Carrosel } from '../../components';

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

  if (error) return <h1>Aconteceu algo errado em detalhes de comida</h1>;
  if (loading) return <h1>Carrgando detalhes de comida...</h1>;
  return (
    <div>
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
