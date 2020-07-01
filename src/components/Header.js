import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import './Header.css';

const Header = ({ titleTag, isSearchablePage, setSearchFilter }) => {
  const [displaySearch, setDisplaySearch] = useState(false);

  return (
    <div className="topBar">
      <div className="headerBar">
        <Link to="/perfil">
          <img data-testid="profile-top-btn" src={profileIcon} alt="Ícone de perfil" />
        </Link>
        <h2 data-testid="page-title">{titleTag}</h2>
        { isSearchablePage ? (
          <button
            className="searchButton"
            data-testid="search-top-btn"
            onClick={() => setDisplaySearch(!displaySearch)}
          />
        ) : <div />
        }
      </div>
      <div className="searchBar"> {
        displaySearch ? <SearchBar titleTag={titleTag} setSearchFilter={setSearchFilter} /> : null
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
