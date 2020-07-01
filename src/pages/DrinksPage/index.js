import React, { useEffect, useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Card, Footer, Loading } from '../../components';
import Header from '../../components/Header';

import { DrinksContext } from '../../contexts/DrinksContext';
import { fetchDrinks, handleDrinksData } from '../../services/APIs/DRINKS_API';

const manageState = (loading, drinks, error) => {
  if (loading) return <Loading />;
  if (error.length > 0) return <h1 data-testid="error-drinks-page">Something Went Wrong</h1>;
  if (drinks.length === 1) return <Redirect to={`/bebidas/${drinks[0].id}`} />;
  return false;
};

function DrinksPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [{ drinks, drinkFilter }, { setDrinks, setDrinkFilter }] = useContext(DrinksContext);

  useEffect(() => {
    fetchDrinks(drinkFilter)
      .then(({ drinks: drk }) => setDrinks(drk.map((drink) => handleDrinksData(drink))))
      .then(() => setLoading(false))
      .catch((err) => {
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
        setError(err);
      });
  }, [setDrinks, setLoading, drinkFilter]);

  return (
    manageState(loading, drinks, error) ||
    <div>
      <Header
        titleTag="Bebidas"
        filterMode={setDrinkFilter}
      />
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
