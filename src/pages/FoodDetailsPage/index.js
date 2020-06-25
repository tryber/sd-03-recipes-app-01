import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { DetailsCard } from '../../components';

import { fetchDetailsFood, handleFoodsData } from '../../services/APIs/FOODS_API';

function FoodDetailsPage({ id }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [food, setFood] = useState(null);

  useEffect(() => {
    fetchDetailsFood(id)
      .then(({ meals }) => setFood(handleFoodsData(meals[0])))
      .then(() => setLoading(false))
      .catch((err) => { console.log(err); setError(err); });
  }, [id, setError, setFood, setLoading]);

  if (error) return <h1>Aconteceu algo errado em detalhes de comida</h1>;
  if (loading) return <h1>Carrgando detalhes de comida...</h1>;
  if (food) return <DetailsCard type="food" eat={food} />;
  return <h1>Não parou em nenhum</h1>;
}

FoodDetailsPage.propTypes = {
  id: PropTypes.number.isRequired,
};

export default FoodDetailsPage;
