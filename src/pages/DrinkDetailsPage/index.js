import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { DetailsCard, Carrosel } from '../../components';

import { fetchDrinkApi, handleDrinksData } from '../../services/APIs/DRINKS_API';
import { fetchFoodsApi, handleFoodsData } from '../../services/APIs/FOODS_API';
import useRequisition from '../../hooks/requisition';

function DrinkDetailsPage({ id }) {
  const [drink, setDrink] = useState(null);
  const fetchDrink = useCallback(() => fetchDrinkApi(`lookup.php?i=${id}`)
    .then(({ drinks }) => setDrink(handleDrinksData(drinks[0])))
  , [id]);
  const [{ loading, error }] = useRequisition(fetchDrink);

  const [recomends, setRecomends] = useState(null);
  const fetchRecomends = useCallback(() => (fetchFoodsApi()
    .then(({ meals }) => setRecomends(meals.slice(0, 6).map((meal) => handleFoodsData(meal))))
  ), []);
  const [{ loading: loadingRecom, error: errorRecom }] = useRequisition(fetchRecomends);

  if (error) return <h1>Aconteceu algo errado em detalhes de bebidas</h1>;
  if (loading) return <h1>Carrgando detalhes de bebidas...</h1>;
  return (
    <div>
      <DetailsCard type="drink" eat={drink} />
      {errorRecom && <h3 data-testid="error-details">Aconteceu algo errado em recomendações</h3>}
      {!errorRecom && loadingRecom && <h3>Carregando detalhes de comida...</h3>}
      {!errorRecom && !loadingRecom && recomends && <Carrosel cards={recomends} />}
    </div>
  );
}

DrinkDetailsPage.propTypes = {
  id: PropTypes.number.isRequired,
};

export default DrinkDetailsPage;
