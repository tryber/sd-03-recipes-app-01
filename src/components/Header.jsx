import React, { useState } from "react";
import { Link } from "react-router-dom";
import profileIcon from "../images/profileIcon.svg";
import './Header.css';

const searchBar = (searchTerm, setSearchTerm, radioFilter, setRadioFilter) => {
  return(
    <div>
      <div>
        <input
          placeholder='Buscar Receita'
          onChange={(evt) => setSearchTerm(evt.target.value)}
        />
      </div>
      <div className='radioSearchButtons'>
        <form onChange={(evt) => setRadioFilter(evt.target.value)}>
          <label for='ingredient'>Ingrediente</label>
          <input type='radio' name='searchTerm' id='ingredient' value='ingredient' />
          <label for='name'>Nome</label>
          <input type='radio' name='searchTerm' id='name' value='name' />
          <label for='firstLetter'>Primeira Letra</label>
          <input type='radio' name='searchTerm' id='firstLetter' value='firstLetter' />
        </form>
      </div>
      <button onClick={() => alert(`Busca por ${searchTerm} e ${radioFilter}`)}>Buscar</button>
    </div>
  );
}

const Header = (titleTag, isSearchablePage) => {
  const [displaySearch, setDisplaySearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [radioFilter, setRadioFilter] = useState('');

  return(
    <div className='topBar'>
      <div className="headerBar">
        <Link to="/perfil">
          <img src={profileIcon} alt='Ícone de perfil'></img>
        </Link>
        <h2>{titleTag}</h2>
        { isSearchablePage ? (
        <button
          className="searchButton"
          onClick={() => setDisplaySearch(!displaySearch)}>
          </button>) : <div></div> }
      </div>
      <div className='searchBar'> {
        displaySearch ?
        searchBar(searchTerm, setSearchTerm, radioFilter, setRadioFilter) :
        null
      }
      </div>
    </div>
  );
}

export default Header;
