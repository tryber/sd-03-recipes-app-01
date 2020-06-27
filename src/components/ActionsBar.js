import React, { useState, useEffect, useCallback } from 'react';

import { takeFavStorage } from '../services/APIs/APIlocalStorage';

import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import './ActionsBar.css';

function ActionsBar({ textToCopy, handleFavorite }) {
  const [isFavorite, setIsFavorite] = useState(takeFavStorage() || false);
  const [coping, setCoping] = useState(false);

  const inverteIsFavorite = useCallback(() => { setIsFavorite((isFav) => !isFav) }, [isFavorite]);
  const enableCopy = useCallback(() => { setCoping(true) }, []);

  useEffect(() => {
    if (coping) {
      navigator.clipboard.writeText(textToCopy)
        .then(() => console.log('succes copy'))
        .catch((err) => console.log(err));

      setCoping(false);
    }
  }, [coping, setCoping]);

  useEffect(() => { handleFavorite(isFavorite); }, [isFavorite]);

  return (
    <div>
      <button className="hidden-button" onClick={inverteIsFavorite}>
        {isFavorite
          ? <img src={blackHeart} alt="is amazing favorite" />
          : <img src={whiteHeart} alt="is not favorite" />
        }
      </button>
      <div>
        <button className="tooltip hidden-button" onClick={enableCopy}>
          <img src={shareIcon} alt="click here to copy the link" />
          <span className="tooltiptext">Copy the link</span>
        </button>
      </div>
    </div>
  );
}

export default ActionsBar;
