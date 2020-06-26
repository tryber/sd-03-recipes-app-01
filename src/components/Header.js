import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import './Header.css';

const searchBar = (searchTerm, setSearchTerm, radioFilter, setRadioFilter) =>
  (
    <div>
      <div>
        <input
          data-testid="search-input"
          placeholder="Buscar Receita"
          onChange={(evt) => setSearchTerm(evt.target.value)}
        />
      </div>
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
      <button
        data-testid="exec-search-btn"
        onClick={() => alert(`Busca por ${searchTerm} e ${radioFilter}`)}
      >
        Buscar
      </button>
    </div>
  );

const Header = ({ titleTag, isSearchablePage }) => {
  const [displaySearch, setDisplaySearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [radioFilter, setRadioFilter] = useState('');

  return (
    <div className="topBar">
      <div className="headerBar">
        <Link to="/perfil">
          <img data-testid="profile-top-btn" src={profileIcon} alt="Ícone de perfil" />
        </Link>
        <h2>{titleTag}</h2>
        {isSearchablePage ? (
          <button
            className="searchButton"
            onClick={() => setDisplaySearch(!displaySearch)}
          />
        ) : <div />
        }
      </div>
      <div className="searchBar"> {
        displaySearch ?
          searchBar(searchTerm, setSearchTerm, radioFilter, setRadioFilter) :
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
