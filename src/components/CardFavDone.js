import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FavoriteIcon from './FavoriteIcon';
import ShareIcon from './ShareIcon';
import './CardFavDone.css';

function CardFavDone({
    id,
    name,
    image,
    alcoholicOrNot,
    area,
    category,
    type,
  }) {

  const link = (type, id) => { return `/${type}s/${id}` }

  return (
    <div key={id} className='card-fav-done'>
      <Link to={link(type, id)}>
        <img
          alt={name}
          src={image}
          width="165px"
          />
      </Link>
        <div className='info'>
      <Link to={link(type, id)}>
        <p className="food-info">{area || alcoholicOrNot} - {category}</p>
        <p className="food-title">{name}</p>
      </Link>
        <div className='action-bar'>
          <FavoriteIcon id={id}/>
          <ShareIcon urlParams={link(type, id)} />
        </div>
      </div>
    </div>
  );
}

CardFavDone.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  index: PropTypes.number,
  // testid: PropTypes.shape({
  //   title: PropTypes.string.isRequired,
  //   img: PropTypes.string.isRequired,
  // }),
};

CardFavDone.defaultProps = {
  testid: { title: '', img: '' },
  index: null,
  show: true,
};

export default CardFavDone;
