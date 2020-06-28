import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FoodsContext } from '../contexts/FoodsContext';
import profileIcon from '../images/profileIcon.svg';
import './Header.css';

const radioButtons = (setRadioFilter) => {
  return (
    <div className="radioSearchButtons">
      <form onChange={(evt) => setRadioFilter(evt.target.value)}>
        <label htmlFor="ingredient">Ingrediente</label>
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          name="searchTerm"
          id="ingredient"
          value="ingredient"
        />
        <label htmlFor="name">Nome</label>
        <input
          type="radio"
          data-testid="name-search-radio"
          name="searchTerm"
          id="name"
          value="name"
        />
        <label htmlFor="firstLetter">Primeira Letra</label>
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          name="searchTerm"
          id="firstLetter"
          value="firstLetter"
        />
      </form>
    </div>
  )
}

const foodSearch = (radioFilter, searchTerm) => {
  switch (radioFilter) {
    case 'ingredient':
      return(`i=${searchTerm}`);
    case 'name':
      return(`s=${searchTerm}`);
    case 'firstLetter':
      if (searchTerm.length > 1) {
        alert('Sua busca deve conter somente 1 (um) caracter');
        break;
      } else {
        return `f=${searchTerm}`;
      }
    default:
      break;
  }
}

const searchBar = (
  searchTerm,
  setSearchTerm,
  radioFilter,
  setRadioFilter,
  setSearchFilter,
  ) => (
  <div>
    <div>
      <input
        data-testid="search-input"
        placeholder="Buscar Receita"
        onChange={(evt) => setSearchTerm(evt.target.value)}
      />
    </div>
    {radioButtons(setRadioFilter)}
    <button
      data-testid="exec-search-btn"
      disabled={!radioFilter}
      onClick={() => setSearchFilter(foodSearch(radioFilter, searchTerm))}
    >
      Buscar comida
    </button>
  </div>
);

const Header = ({ titleTag, isSearchablePage }) => {
  const [displaySearch, setDisplaySearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [radioFilter, setRadioFilter] = useState('');
  const [{searchFilter}, {setSearchFilter}] = useContext(FoodsContext);

  return (
    <div className="topBar">
      <div className="headerBar">
        <Link to="/perfil">
          <img data-testid="profile-top-btn" src={profileIcon} alt="Ícone de perfil" />
        </Link>
        <h2 data-testid="page-title">{titleTag}</h2>
        { isSearchablePage ? (
          <button
            data-testid="search-top-btn"
            className="searchButton"
            onClick={() => setDisplaySearch(!displaySearch)}
          />
        ) : <div />
        }
      </div>
      <div className="searchBar"> {
        displaySearch ?
        searchBar(searchTerm, setSearchTerm, radioFilter, setRadioFilter, setSearchFilter) :
        null
      }
      </div>
    </div>
  );
};

Header.propTypes = {
  titleTag: PropTypes.string.isRequired,
  isSearchablePage: PropTypes.bool.isRequired,
};

export default Header;
