import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import './Header.css';

const Header = ({ titleTag, filterMode }) => {
  const [displaySearch, setDisplaySearch] = useState(false);

  return (
    <div className="topBar">
      <div className="headerBar">
        <Link to="/perfil" data-testid="profile-link-btn" >
          <img data-testid="profile-top-btn" src={profileIcon} alt="Ícone de perfil" />
        </Link>
        <h2 data-testid="page-title">{titleTag}</h2>
        { filterMode ? (
          <button
            className="searchButton"
            data-testid="search-top-btn"
            onClick={() => setDisplaySearch(!displaySearch)}
          />
        ) : <div />
        }
      </div>
      <div className="searchBar newFormCss"> {
        displaySearch ?
          <SearchBar
            setFilter={filterMode}
          /> : null
      }
      </div>
    </div>
  );
};

Header.propTypes = {
  filterMode: PropTypes.func.isRequired,
  titleTag: PropTypes.string.isRequired,
};

export default Header;
