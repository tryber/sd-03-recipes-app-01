import React, { useState, useEffect } from 'react';

import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import './ActionsBar.css';

function ActionsBar() {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <button className="hidden-button" onClick={() => setIsFavorite(!isFavorite)}>
      {isFavorite
        ? <img src={blackHeart} alt="is amazing favorite" />
        : <img src={whiteHeart} alt="is not favorite" />
      }
    </button>
  );
}

export default ActionsBar;
