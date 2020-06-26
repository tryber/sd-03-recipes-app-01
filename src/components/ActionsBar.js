import React, { useState } from 'react';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

function ActionsBar() {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <button onClick={() => setIsFavorite(!isFavorite)}>
      {isFavorite
        ? <img src={whiteHeart} alt="is not favorite" />
        : <img src={blackHeart} alt="is not favorite" />
      }
    </button>
  );
}

export default ActionsBar;
