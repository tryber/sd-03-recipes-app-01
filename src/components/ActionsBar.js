import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import './ActionsBar.css';

function ActionsBar({ handleFavorite, isFavInit = false }) {
  const [isFav, setIsFav] = useState(isFavInit);
  const [copying, setCopying] = useState(false);

  const toggleFavorite = useCallback(() => { setIsFav(!isFav); }, [isFav]);
  const enableCopy = useCallback(() => { setCopying(true); }, []);
  const disableCopy = useCallback(() => { setCopying(false); }, []);

  useEffect(() => {
    if (copying) {
      navigator.clipboard.writeText(window.location.href)
        .then(() => console.log('Copy succeeded'))
        .catch((err) => console.log(err));
    }
  }, [copying, setCopying]);

  useEffect(() => { handleFavorite(isFav); }, [isFav, handleFavorite]);

  return (
    <div>
      <button className="hidden-button" onClick={toggleFavorite}>
        {isFav
          ? <img data-testid="favorite-btn" src={blackHeart} alt="is amazing favorite" />
          : <img data-testid="favorite-btn" src={whiteHeart} alt="is not favorite" />
        }
      </button>
      <button className="tooltip hidden-button" onClick={enableCopy} onMouseOut={disableCopy}>
        {copying
          ? <p>Link copiado!</p>
          : <img data-testid="share-btn" src={shareIcon} alt="click to copy the link" />
        }
        {copying || <span className="tooltiptext">Copiar Link</span>}
      </button>
    </div>
  );
}

ActionsBar.propTypes = {
  handleFavorite: PropTypes.func.isRequired,
  isFavInit: PropTypes.bool.isRequired,
};

export default ActionsBar;
