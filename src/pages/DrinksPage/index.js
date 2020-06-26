import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';


import { Card, Footer, Loading } from '../../components';

import { DrinksContext } from '../../contexts/DrinksContext';
import { fetchDrinks, handleDrinksData } from '../../services/APIs/DRINKS_API';

function FoodsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [{ drinks }, { setDrinks }] = useContext(DrinksContext);

  useEffect(() => {
    fetchDrinks()
      .then(({ drinks: drk }) => setDrinks(drk.map((drink) => handleDrinksData(drink))))
      .then(() => setLoading(false))
      .catch((err) => setError(err));
  }, [setDrinks, setLoading]);

  if (error.length > 0) return <h1 data-testid="error-drinks-page">Something Went Wrong</h1>;
  if (loading) return <Loading />;

  return (
    <div>
      <h1>Bebidas</h1>
      {drinks.slice(0, 12).map(({ id, name, srcImage }, index) => (
        <Link to={`/bebidas/${id}`}>
          <Card key={id} name={name} index={index} srcImage={srcImage} />
        </Link>
      ))}
      <Footer />
    </div>
  );
}

export default FoodsPage;
