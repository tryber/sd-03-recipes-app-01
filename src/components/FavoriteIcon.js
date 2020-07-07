import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import './FavoriteIcon.css';

function FavoriteIcon({ handleFavoriteChange, isFavoriteInit }) {
  const [isFavorite, setIsFavorite] = useState(isFavoriteInit);

  const toggleFavorite = useCallback(() => {
    setIsFavorite(!isFavorite);
  }, [isFavorite, setIsFavorite]);

  useEffect(() => { handleFavoriteChange(isFavorite); }, [isFavorite, handleFavoriteChange]);

  const src = isFavorite ? blackHeart : whiteHeart;
  const alt = `Item is ${isFavorite ? '' : 'not'} favorited`;

  return (
    <button className="hidden-button" onClick={toggleFavorite}>
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
  handleFavoriteChange: () => true,
  isFavoriteInit: false,
};

export default FavoriteIcon;
