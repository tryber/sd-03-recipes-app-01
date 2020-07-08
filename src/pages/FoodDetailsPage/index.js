import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import './FoodDetails.css';

import { DetailsCard, Carrosel } from '../../components';

import { fetchFoodsApi, handleFoodsData } from '../../services/APIs/FOODS_API';
import { fetchDrinkApi, handleDrinksData } from '../../services/APIs/DRINKS_API';
import useRequisition from '../../hooks/requisition';

function FoodDetailsPage({ id }) {
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
  if (loading) return <h1>Carregando receita</h1>;
  return (
<<<<<<< HEAD
    <center>
      <div className="allPage">
        <DetailsCard type="food" eat={food} />
        {errorRecom && <h3 data-testid="error-recom">Aconteceu algo errado em recomendações</h3>}
        {!errorRecom && loadingRecom && <h3>Carregando detalhes de comida...</h3>}
        {!errorRecom && !loadingRecom && recomends && <Carrosel cards={recomends} />}
      </div>
    </center>
=======
    <div>
      <DetailsCard type="food" recipe={food} />
      {errorRecom && <h3 data-testid="error-recom">Aconteceu algo errado em recomendações</h3>}
      {!errorRecom && loadingRecom && <h3>Carregando receita</h3>}
      {!errorRecom && !loadingRecom && recomends && <Carrosel cards={recomends} />}
    </div>
>>>>>>> c2bdab2df9974a803118bc50e73df408d4da33af
  );
}

FoodDetailsPage.propTypes = {
  id: PropTypes.number.isRequired,
};

export default FoodDetailsPage;
