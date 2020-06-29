import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import './ActionsBar.css';

function ActionsBar({ handleFavorite, isFavInit = false }) {
  const [isFav, setIsFav] = useState(isFavInit);
  const [coping, setCoping] = useState(false);

  const inverteIsFavorite = useCallback(() => { setIsFav(!isFav); }, [isFav]);
  const enableCopy = useCallback(() => { setCoping(true); }, []);
  const disableCopy = useCallback(() => { setCoping(false); }, []);

  useEffect(() => {
    if (coping) {
      navigator.clipboard.writeText(window.location.href)
        .then(() => console.log('succes copy'))
        .catch((err) => console.log(err));
    }
  }, [coping, setCoping]);

  useEffect(() => { handleFavorite(isFav); }, [isFav, handleFavorite]);

  return (
    <div>
      <button className="hidden-button" onClick={inverteIsFavorite}>
        {isFav
          ? <img data-testid="favorite-btn" src={blackHeart} alt="is amazing favorite" />
          : <img data-testid="favorite-btn" src={whiteHeart} alt="is not favorite" />
        }
      </button>
      <button className="tooltip hidden-button" onClick={enableCopy} onMouseOut={disableCopy}>
        {coping
          ? <p>Link copiado!</p>
          : <img data-testid="share-btn" src={shareIcon} alt="click to copy the link" />
        }
        {coping || <span className="tooltiptext">Copiar Link</span>}
      </button>
    </div>
  );
}

ActionsBar.propTypes = {
  handleFavorite: PropTypes.func.isRequired,
  isFavInit: PropTypes.bool.isRequired,
};

export default ActionsBar;
