import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { rmFromFavoriteStorage } from '../services/APIs/APIlocalStorage';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import './ActionsBar.css';

function FavoriteIcon({id}) {
  const [isFav, setIsFav] = useState(true);

  return (
    <div>
      <button className="hidden-button" onClick={() => {
        rmFromFavoriteStorage(id);
        setIsFav(false);
      }}>
        {isFav
          ? <img data-testid="favorite-btn" src={blackHeart} alt="is amazing favorite" />
          : <img data-testid="favorite-btn" src={whiteHeart} alt="is not favorite" />
        }
      </button>
    </div>
  );
}

FavoriteIcon.propTypes = {
  isFavInit: PropTypes.bool.isRequired,
};

export default FavoriteIcon;
