import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { rmFromFavoriteStorage } from '../services/APIs/APIlocalStorage';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import './ActionsBar.css';

function FavoriteIcon({ id }) {
  const [isFav, setIsFav] = useState(true);

  return (
    <div>
      <button
        className="hidden-button"
        onClick={() => {
          rmFromFavoriteStorage(id);
          setIsFav(false);
        }}
      >
        {isFav
          ? <img data-testid="favorite-btn" src={blackHeart} alt="Is favorited" />
          : <img data-testid="favorite-btn" src={whiteHeart} alt="Is not favorited" />
        }
      </button>
    </div>
  );
}

FavoriteIcon.propTypes = {
  id: PropTypes.number.isRequired,
};

export default FavoriteIcon;
