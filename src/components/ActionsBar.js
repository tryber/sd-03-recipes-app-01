import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import './ActionsBar.css';

function ActionsBar({ textToCopy, handleFavorite, isFavInit = false }) {
  const [isFav, setIsFav] = useState(isFavInit);
  const [coping, setCoping] = useState(false);

  const inverteIsFavorite = useCallback(() => { setIsFav(isFav); }, [isFav]);
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
          ? <img src={blackHeart} alt="is amazing favorite" />
          : <img src={whiteHeart} alt="is not favorite" />
        }
      </button>
      <button className="tooltip hidden-button" onClick={enableCopy} onMouseOut={disableCopy}>
        <img src={shareIcon} alt="click here to copy the link" />
        <span className="tooltiptext">{coping ? 'Copiado!' : 'Copiar link'}</span>
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
