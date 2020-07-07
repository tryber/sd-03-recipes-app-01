import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import shareIcon from '../images/shareIcon.svg';
import './ShareIcon.css';


function ShareIcon({ id, type }) {
  const [copying, setCopying] = useState(false);
  const makeLink = () => (`/${type}s/${id}`);
  const urlParams = makeLink(id, type);
  const enableCopy = useCallback(() => { setCopying(true); }, []);
  const disableCopy = useCallback(() => { setCopying(false); }, []);

  useEffect(() => {
    if (copying) {
      navigator.clipboard.writeText(`${window.location.host}${urlParams}`)
        .catch((err) => console.log(err));
    }
  }, [copying, setCopying, urlParams]);

  return (
    <button className="tooltip hidden-button" onClick={enableCopy} onMouseOut={disableCopy}>
      {copying
        ? <p>Link copiado!</p>
        : <img data-testid="share-btn" src={shareIcon} alt="click to copy the link" />
      }
      {copying || <span className="tooltiptext">Copiar Link</span>}
    </button>
  );
}

ShareIcon.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default ShareIcon;
