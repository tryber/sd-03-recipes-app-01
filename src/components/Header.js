import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/styles';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

const style = makeStyles({
  headerTool: {
    flex: 1,
  }
});

const Header = ({ titleTag, filterMode }) => {
  const [displaySearch, setDisplaySearch] = useState(false);
  return (
    <AppBar position="static" color="primary">
      <Toolbar classes={style.headerTool}>
        <Link to="/perfil" data-testid="profile-link-btn" >
          <img data-testid="profile-top-btn" src={profileIcon} alt="Ícone de perfil" />
        </Link>
        <h2 data-testid="page-title">{titleTag}</h2>
        {filterMode && (
          <button className="hidden-button" onClick={() => setDisplaySearch((dplSch) => !dplSch)}>
            <img alt="search icon" data-testid="search-top-btn" src={searchIcon} />
          </button>
        )}
      </Toolbar>
      <div>
        {displaySearch ? <SearchBar setFilter={filterMode} /> : null}
      </div>
    </AppBar>
  );
};

Header.propTypes = {
  filterMode: PropTypes.bool,
  titleTag: PropTypes.string.isRequired,
};

Header.defaultProps = { filterMode: false };

export default Header;
