import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import './FavoriteIcon.css';

function FavoriteIcon({ handleFavoriteChange, isFavoriteInit = false }) {
  const [isFavorite, setIsFav] = useState(isFavoriteInit);

  const inverteIsFavorite = useCallback(() => {
    setIsFav((fav) => !fav);
  }, [isFavorite]);

  useEffect(() => { handleFavoriteChange(isFavorite); }, [isFavorite, handleFavoriteChange]);

  const src = isFavorite ? blackHeart : whiteHeart;
  const alt = `is ${isFavorite ? '': 'not'} favorited`;

  return (
    <button className="hidden-button" onClick={inverteIsFavorite}>
      <img
        alt={alt}
        data-testid="favorite-btn"
        src={src}
      />
    </button>
  );
}

FavoriteIcon.propTypes = {
  handleFavoriteChange: PropTypes.func,
  isFavoriteInit: PropTypes.bool,
};

FavoriteIcon.defaultProps = {
  handleFavoriteChange: (fav) => console.log(fav),
  isFavoriteInit: false,
};

export default FavoriteIcon;
