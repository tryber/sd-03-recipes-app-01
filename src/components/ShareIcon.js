import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types'

import srcShareIcon from '../images/shareIcon.svg';
import './ShareIcon.css';

function ShareIcon({ textToCopy }) {
  const [coping, setCoping] = useState(false);
  const enableCopy = useCallback(() => { setCoping(true); }, []);
  const disableCopy = useCallback(() => { setCoping(false); }, []);

  useEffect(() => {
    if (coping) {
      navigator.clipboard.writeText(textToCopy)
        .then(() => console.log('succes copy'))
        .catch((err) => console.log(err));
    }
  }, [coping, setCoping, textToCopy]);

  return (
    <button
      className="tooltip hidden-button"
      onClick={enableCopy}
      onMouseOut={disableCopy}
    >
      {coping
        ? <p>Link copiado!</p>
        : <img data-testid="share-btn" src={srcShareIcon} alt="click to copy the link" />
      }
      {coping || <span className="tooltiptext">Copiar Link</span>}
    </button>
  );
}

ShareIcon.propTypes = {
  textToCopy: PropTypes.string.isRequired,
};

export default ShareIcon;
