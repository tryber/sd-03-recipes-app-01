import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareIcon from './ShareIcon';
import './CardFavDone.css';
import { rmFromFavoriteStorage } from '../services/APIs/APIlocalStorage';

const addExtraInfo = (tags, doneDate, index) => (
  <div>
    <p data-testid={`${index}-horizontal-done-date`}>
      Feita em: {new Date(doneDate).toLocaleDateString()}
    </p>
    {tags.map((tag) =>
      <span
        key={tag}
        className="food-tag"
        data-testid={`${index}-${tag}-horizontal-tag`}
      >
        {tag}
      </span>,
      )}
  </div>
);

function CardFavDone({
  id,
  type,
  area,
  name,
  image,
  category,
  alcoholicOrNot,
  doneDate,
  tags,
  mode,
  index,
}) {
  return (
    <div className="card-fav-done">
      <Link to={`/${type}s/${id}`}>
        <img
          alt={name}
          data-testid={`${index}-horizontal-image`}
          src={image}
          width="165px"
        />
      </Link>
      <div className="info">
        <Link to={`/${type}s/${id}`}>
          <p
            className="food-info"
            data-testid={`${index}-horizontal-top-text`}
          >
            {area || alcoholicOrNot} - {category}
          </p>
          <p className="food-title" data-testid={`${index}-horizontal-name`} >{name}</p>
        </Link>
        <div className="action-bar">
          {mode === 'done'
          ? addExtraInfo(tags, doneDate, index)
          : (
            <button
              className="unfavoriteBtn"
              data-testid={`${index}-horizontal-favorite-btn`}
              onClick={() => rmFromFavoriteStorage(id)}
            />
            )
          }
          <ShareIcon textToCopy={`${window.location.host}/${type}/${id}`} />
        </div>
      </div>
    </div>
  );
}

CardFavDone.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  doneDate: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  mode: PropTypes.string,
};

CardFavDone.defaultProps = {
  index: null,
  show: true,
};

export default CardFavDone;
