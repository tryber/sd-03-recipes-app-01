import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DetailsCard } from '../../components';
import { fetchDetailsDrink, handleDrinksData } from '../../services/APIs/DRINKS_API';

function DrinkDetailsPage({ id }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [drink, setDrink] = useState(null);

  useEffect(() => {
    fetchDetailsDrink(id)
      .then(({ drinks: drk }) => setDrink(handleDrinksData(drk[0])))
      .then(() => setLoading(false))
      .catch((err) => { console.log(err); setError(err); });
  }, [id, setError, setDrink, setLoading]);

  if (error) return <h1>Aconteceu algo errado em detalhes de bebidas 1</h1>;
  if (loading) return <h1>Carrgando detalhes de bebidas...</h1>;
  if (drink) return <DetailsCard type="drink" eat={drink} />;
  return <h1>Não parou em nenhum</h1>;
}

DrinkDetailsPage.propTypes = {
  id: PropTypes.number.isRequired,
};

export default DrinkDetailsPage;
