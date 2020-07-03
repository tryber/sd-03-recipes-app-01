import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FavoriteIcon from './FavoriteIcon';
import ShareIcon from './ShareIcon';
import './CardFavDone.css';

function CardFavDone({
    id,
    type,
    area,
    name,
    image,
    category,
    alcoholicOrNot,
  }) {
  const makeLink = () => (`/${type}s/${id}`);

  return (
    <div key={id} className="card-fav-done">
      <Link to={makeLink(type, id)}>
        <img
          alt={name}
          src={image}
          width="165px"
        />
      </Link>
      <div className="info">
        <Link to={makeLink()}>
          <p className="food-info">{area || alcoholicOrNot} - {category}</p>
          <p className="food-title">{name}</p>
        </Link>
        <div className="action-bar">
          <FavoriteIcon id={id} />
          <ShareIcon urlParams={makeLink(type, id)} />
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
  testid: { title: '', img: '' },
  index: null,
  show: true,
};

export default CardFavDone;
