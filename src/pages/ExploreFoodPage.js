import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { Footer } from '../components';
import { fetchApis } from '../services/APIs/recipesApi';

const handleRedirect = async (setId) => {
  const data = await fetchApis('random.php');
  const { idMeal } = data.meals[0];
  return setId(idMeal);
};

function ExploreFoodPage() {
  const [id, setId] = useState(null);
  if (id) return <Redirect to={`/comidas/${id}`} />;
  return (
    <div>
      <Header titleTag="Explorar Comidas" />
      <Link to="/explorar/comidas/ingredientes">
        <button data-testid="explore-by-ingredient">Por Ingredientes</button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button data-testid="explore-by-area">Por Local de Origem</button>
      </Link>
      <button type="button" data-testid="explore-surprise" onClick={() => handleRedirect(setId)}>
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreFoodPage;
