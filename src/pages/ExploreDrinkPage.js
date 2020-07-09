import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { Footer } from '../components';
import { fetchApis } from '../services/APIs/recipesApi';

const handleRedirect = async (setId) => {
  const data = await fetchApis('random.php');
  const { idDrink } = data.drinks[0];
  return setId(idDrink);
};

function ExploreDrinkPage() {
  const [id, setId] = useState(null);
  if (id) return <Redirect to={`/bebidas/${id}`} />;
  return (
    <div>
      <Header titleTag="Explorar Bebidas" />
      <Link to="/explorar/bebidas/ingredientes">
        <button data-testid="explore-by-ingredient">Por Ingredientes</button>
      </Link>
      <button type="button" data-testid="explore-surprise" onClick={() => handleRedirect(setId)}>
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreDrinkPage;
