import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import shareIcon from '../images/shareIcon.svg';
import './ShareIcon.css';


function ShareIcon({ textToCopy, index }) {
  const [copying, setCopying] = useState(false);

  const enableCopy = useCallback(() => { setCopying(true); }, []);
  const disableCopy = useCallback(() => { setCopying(false); }, []);

  useEffect(() => {
    if (copying) {
      navigator.clipboard.writeText(textToCopy)
        .catch((err) => console.log(err));
    }
  }, [copying, setCopying]);

  return (
    <button
      className="tooltip hidden-button"
      onClick={enableCopy}
      onMouseOut={disableCopy}
      data-testid={`${index}-horizontal-share-btn`}
    >
      {copying
        ? <p>Link copiado!</p>
        : <img data-testid="share-btn" src={shareIcon} alt="click to copy the link" />
      }
      {copying || <span className="tooltiptext">Copiar Link</span>}
    </button>
  );
}

ShareIcon.propTypes = {
  index: PropTypes.number.isRequired,
  textToCopy: PropTypes.string.isRequired,
};

export default ShareIcon;
