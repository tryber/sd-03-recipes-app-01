import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import ShareIcon from './ShareIcon';
import FavoriteIcon from './FavoriteIcon';
import {
  sendToFavoriteStorage,
  rmFromFavoriteStorage,
  takeFavStorage,
} from '../services/APIs/APIlocalStorage';

function ActionsBar({ eat, type }) {
  const handleFavoriteStorage = useCallback((isToSend) => {
    if (isToSend) return sendToFavoriteStorage(eat, type);
    return rmFromFavoriteStorage(eat.id);
  }, [type, eat]);

  const isFavoriteInit = takeFavStorage()
    .some((favorite) => Number(favorite.id) === Number(eat.id));

  return (
    <div>
      <ShareIcon textToCopy={window.location.href} />
      <FavoriteIcon
        handleFavoriteChange={handleFavoriteStorage}
        isFavoriteInit={isFavoriteInit}
      />
    </div>
  );
}

ActionsBar.propTypes = {
  eat: PropTypes.shape({
    id: PropTypes.string.isRequired, // number as string
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    instructions: PropTypes.string.isRequired,
    origin: PropTypes.string,
    srcImage: PropTypes.string.isRequired,
    video: PropTypes.string,
    source: PropTypes.string,
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        ingredient: PropTypes.string.isRequired,
        measure: PropTypes.string,
      }).isRequired,
    ).isRequired,
    isAlcoholic: PropTypes.string,
  }).isRequired,
  type: PropTypes.oneOf(['food', 'drink']).isRequired,
};

ActionsBar.defaultProps = {
  eat: { source: null, isAlcoholic: null, origin: '', video: '' },
};

export default ActionsBar;
