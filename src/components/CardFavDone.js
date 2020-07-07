import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareIcon from './ShareIcon';
import './CardFavDone.css';
import { rmFromFavoriteStorage } from '../services/APIs/APIlocalStorage';

function CardFavDone({
  id,
  type,
  area,
  name,
  image,
  category,
  alcoholicOrNot,
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
          <button
            className="unfavoriteBtn"
            onClick={() => rmFromFavoriteStorage(id)}
          />
          <ShareIcon id={id} type={type} />
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
