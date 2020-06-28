import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import './ActionsBar.css';

function ActionsBar({ textToCopy, handleFavorite, isFavInit = false }) {
  const [isFav, setIsFav] = useState(isFavInit);
  const [coping, setCoping] = useState(false);

  const inverteIsFavorite = useCallback(() => { setIsFav(!isFav); }, [isFav]);
  const enableCopy = useCallback(() => { setCoping(true); }, []);
  const disableCopy = useCallback(() => { setCoping(false); }, []);

  useEffect(() => {
    if (coping) {
      navigator.clipboard.writeText(textToCopy)
        .then(() => console.log('succes copy'))
        .catch((err) => console.log(err));
    }
  }, [coping, setCoping, textToCopy]);

  useEffect(() => { handleFavorite(isFav); }, [isFav, handleFavorite]);

  return (
    <div>
      <button className="hidden-button" onClick={inverteIsFavorite}>
        {isFav
          ? <img data-testid="favorite-btn" src={blackHeart} alt="is amazing favorite" />
          : <img data-testid="favorite-btn" src={whiteHeart} alt="is not favorite" />
        }
      </button>
      <button
        data-testid="share-btn"
        disabled={Boolean(textToCopy)}
        onClick={enableCopy} onMouseOut={disableCopy}
      >
        <img className="tooltip hidden-button" src={shareIcon} alt="click to copy the link" />
        {textToCopy
          ? <span className="tooltiptext">{coping ? 'Copiar Link' : 'Copiar'}</span>
          : <span className="tooltiptext">There is no Link</span>
        }
      </button>
    </div>
  );
}

ActionsBar.propTypes = {
  textToCopy: PropTypes.string.isRequired,
  handleFavorite: PropTypes.func.isRequired,
  isFavInit: PropTypes.bool.isRequired,
};

export default ActionsBar;
