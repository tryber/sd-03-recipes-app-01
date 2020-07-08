import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareIcon from './ShareIcon';
import './CardFavDone.css';
import { rmFromFavoriteStorage } from '../services/APIs/APIlocalStorage';

const addExtraInfo = (tags, doneDate) => (
  <div>
    <p>Feita em: {new Date(doneDate).toLocaleDateString()}</p>
    {tags.map((tag) => <span className='food-tag'>{tag}</span>)}
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
}) {
  return (
    <div key={id} className="card-fav-done">
      <Link to={`/${type}s/${id}`}>
        <img
          alt={name}
          src={image}
          width="165px"
        />
      </Link>
      <div className="info">
        <Link to={`/${type}s/${id}`}>
          <p className="food-info">{area || alcoholicOrNot} - {category}</p>
          <p className="food-title">{name}</p>
        </Link>
        <div className="action-bar">
          {mode === 'done'
          ? addExtraInfo(tags, doneDate)
          : (<button
              className="unfavoriteBtn"
              onClick={() => rmFromFavoriteStorage(id)}
            />
            )
          }

          <ShareIcon textToCopy={`${window.location.host}/${type}s/${id}`} />
        </div>
      </div>
    </div>
  );
}

CardFavDone.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
};

CardFavDone.defaultProps = {
  // testid: { title: '', img: '' },
  index: null,
  show: true,
};

export default CardFavDone;
