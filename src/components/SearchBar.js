import React, { useState, useContext } from 'react';
import { FoodsContext } from '../contexts/FoodsContext';
import { DrinksContext } from '../contexts/DrinksContext';
import './Header.css';

const radioButtons = (setRadioFilter) => (
  <div className="radioSearchButtons">
    <form onChange={(evt) => setRadioFilter(evt.target.value)}>
      <label htmlFor="ingredient">Ingrediente</label>
      <input
        type="radio"
        id="ingredient"
        name="searchTerm"
        value="ingredient"
        data-testid="ingredient-search-radio"
      />
      <label htmlFor="name">Nome</label>
      <input
        type="radio"
        id="name"
        name="searchTerm"
        value="name"
        data-testid="name-search-radio"
      />
      <label htmlFor="firstLetter">Primeira Letra</label>
      <input
        type="radio"
        id="firstLetter"
        name="searchTerm"
        value="firstLetter"
        data-testid="first-letter-search-radio"
      />
    </form>
  </div>
);

const setURL = (radioFilter, searchTerm) => {
  switch (radioFilter) {
    case 'ingredient':
      return (`filter.php?i=${searchTerm}`);
    case 'name':
      return (`search.php?s=${searchTerm}`);
    case 'firstLetter':
      if (searchTerm.length > 1) {
        alert('Sua busca deve conter somente 1 (um) caracter');
        break;
      } else {
        return `search.php?f=${searchTerm}`;
      }
    default:
      break;
  }
  return 's=';
};

function SearchBar({searchType}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [radioFilter, setRadioFilter] = useState('');
  const { setFoodFilter } = useContext(FoodsContext)[1];
  const { setDrinkFilter } = useContext(DrinksContext)[1];

  return (
    <div>
      <div>
        <input
          data-testid="search-input"
          placeholder="Buscar Receita"
          onChange={(evt) => setSearchTerm(evt.target.value)}
        />
      </div>
      {radioButtons(setRadioFilter)}
      {searchType === 'Comidas' ?
      <button
        data-testid="exec-search-btn"
        disabled={!radioFilter}
        onClick={() => setFoodFilter(setURL(radioFilter, searchTerm))}
      >
        Buscar comidas
      </button>
      : <button
          data-testid="exec-search-btn"
          disabled={!radioFilter}
          onClick={() => setDrinkFilter(setURL(radioFilter, searchTerm))}
        >
        Buscar bebidas
        </button>
      }
    </div>
  );
}

export default SearchBar;
