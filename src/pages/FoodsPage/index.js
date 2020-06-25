import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { Card } from '../../components';

import { FoodsContext } from '../../contexts/FoodsContext';
import { fetchFoods, handleFoodsData } from '../../services/APIs/FOODS_API';

function FoodsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [{ foods }, { setFoods }] = useContext(FoodsContext);

  useEffect(() => {
    fetchFoods()
      .then(({ meals }) => setFoods(meals.map((food) => handleFoodsData(food))))
      .then(() => setLoading(false))
      .catch((err) => { console.log(err); setError(err); });
  }, [setFoods, setLoading]);

  if (error.length > 0) return <h1 data-testid="error-foods-page">Something Went Wrong</h1>;
  if (loading) return <h1>Loading...</h1>;
  console.log(foods[0])

  return (
    <div>
      <h1>Comidas</h1>
      {foods.slice(0, 12).map(({ id, name, srcImage }, index) => (
        <Link to={`/comidas/${id}`}>
          <Card key={id} name={name} index={index} srcImage={srcImage} />
        </Link>
      ))}
    </div>
  );
}

export default FoodsPage;
