import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import CardFavDone from '../../components/CardFavDone';
import './index.css';
import { getFavStorage } from '../../services/APIs/APIlocalStorage';

function FavoriteRecipesPage() {
  const data = getFavStorage();
  const [results, setResults] = useState(data);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setResults(data.filter((el) => el.type === filter));
  }, [filter]);

  return (
    <div className="fav-list">
      <Header titleTag="Receitas Favoritas" />
      <button onClick={() => setFilter('comida')} data-testid="filter-by-food-btn">Food</button>
      <button onClick={() => setFilter('bebida')} data-testid="filter-by-drink-btn">Drink</button>
      <button onClick={() => setResults(data)} data-testid="filter-by-all-btn">All</button>
      <div className="fav-grid">
        {filter
          ? results.map((elem) => <CardFavDone {...elem} />)
          : data.map((elem) => <CardFavDone {...elem} />)
        }
      </div>
    </div>
  );
}

export default FavoriteRecipesPage;
