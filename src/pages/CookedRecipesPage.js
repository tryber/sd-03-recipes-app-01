import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { doneRecipes } from '../services/APIs/APIlocalStorage';
import CardFavDone from '../components/CardFavDone';

function CookedRecipesPage() {
  const data = doneRecipes();
  const [results, setResults] = useState(data);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setResults(data.filter((el) => el.type === filter));
  }, [filter, data]);

  return (
    <div className="fav-list">
      <Header titleTag="Receitas Feitas" />
      <button onClick={() => setFilter('comida')} data-testid="filter-by-food-btn">Food</button>
      <button onClick={() => setFilter('bebida')} data-testid="filter-by-drink-btn">Drink</button>
      <button onClick={() => setResults(data)} data-testid="filter-by-all-btn">All</button>
      <div className="fav-grid">
        {filter
          ? results.map((e, index) => (
            <CardFavDone recipe={e} mode="done" key={e.id} index={index} />
            ))
          : data.map((e, index) => <CardFavDone recipe={e} mode="done" key={e.id} index={index} />)
        }
      </div>
    </div>
  );
}

export default CookedRecipesPage;
