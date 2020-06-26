import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';


import { Card, Footer, Loading } from '../../components';
import Header from '../../components/Header';

import { DrinksContext } from '../../contexts/DrinksContext';
import { fetchDrinks, handleDrinksData } from '../../services/APIs/DRINKS_API';

function DrinksPage() {
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
      <Header titleTag="Bebidas" isSearchablePage />
      {drinks.slice(0, 12).map(({ id, name, srcImage }, index) => (
        <Link key={id} to={`/bebidas/${id}`}>
          <Card name={name} index={index} srcImage={srcImage} />
        </Link>
      ))}
      <Footer />
    </div>
  );
}

export default DrinksPage;
