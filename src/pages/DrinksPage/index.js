import React, { useEffect, useState, useContext } from 'react';

import { Card } from '../../components';

import { DrinksContext } from '../../contexts/DrinksContext';
import { fetchDrinks, handleDrinksData } from '../../services/APIs/DRINKS_API';

function FoodsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [{ drinks }, { setDrinks }]  = useContext(DrinksContext);

  useEffect(() => {
    fetchDrinks()
      .then(({ drinks }) => setDrinks(drinks.map((drinks) => handleDrinksData(drinks))))
      .then(() => setLoading(false))
      .catch((error) => { console.log(error); setError(error) })
  }, [setDrinks, setLoading]);

  if (error.length > 0) return <h1>Something Went Wrong</h1>
  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>Comidas</h1>
      {drinks.slice(0, 12).map(({ name, srcImage }, index) => (
        <Card key={index} name={name} index={index} srcImage={srcImage} />
      ))}
    </div>
  );
}

export default FoodsPage;
