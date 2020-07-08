import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import CardFavDone from '../../components/CardFavDone';
import './index.css';
import { getFavStorage } from '../../services/APIs/APIlocalStorage';
import useLocalStorage from '../../hooks/localStorage';

const setStorage = (nS) => localStorage.setItem('favoriteRecipes', JSON.stringify(nS));

function FavoriteRecipesPage() {
  const [results, setResults] = useLocalStorage(getFavStorage(), setStorage);
  const [filter, setFilter] = useState('');
  const [rmId, setRmId] = useState(0);

  useEffect(() => {
    setResults((res) => res.filter((fav) => Number(fav.id) !== Number(rmId)));
  }, [rmId, setResults]);

  return (
    <div className="fav-list">
      <Header titleTag="Receitas Favoritas" />
      <button onClick={() => setFilter('comida')} data-testid="filter-by-food-btn">Food</button>
      <button onClick={() => setFilter('bebida')} data-testid="filter-by-drink-btn">Drink</button>
      <button onClick={() => setFilter('')} data-testid="filter-by-all-btn">All</button>
      <div className="fav-grid">
        {(filter === '' ? results : results.filter((elem) => elem.type === filter))
          .map((e, index) => (
            <CardFavDone recipe={e} key={e.id} index={index} rmRecipe={setRmId} />
        ))}
      </div>
    </div>
  );
}

export default FavoriteRecipesPage;
