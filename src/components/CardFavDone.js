import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareIcon from './ShareIcon';
import blackHeart from '../images/blackHeartIcon.svg';
import './CardFavDone.css';

const addExtraInfo = (tags, doneDate, index) => (
  <div>
    <p data-testid={`${index}-horizontal-done-date`}>
      Feita em: {doneDate}
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

function CardFavDone({ recipe, mode, index, rmRecipe }) {
  const { id, type, area, name, image, category, alcoholicOrNot, doneDate, tags } = recipe;
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
          <p className="food-info" data-testid={`${index}-horizontal-top-text`}>
            {area || alcoholicOrNot} - {category}
          </p>
          <p className="food-title" data-testid={`${index}-horizontal-name`} >{name}</p>
        </Link>
        <div className="action-bar">
          {mode === 'done'
          ? addExtraInfo(tags, doneDate, index)
          : <button className="unfavoriteBtn hidden-button" onClick={() => rmRecipe(id)}>
            <img src={blackHeart} alt="favorited Icon" data-testid={`${index}-horizontal-favorite-btn`} />
          </button>
          }
          <ShareIcon
            testid={`${index}-horizontal-share-btn`}
            textToCopy={`${window.location.origin}/${type}s/${id}`}
          />
        </div>
      </div>
    </div>
  );
}

CardFavDone.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    doneDate: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  index: PropTypes.number.isRequired,
  mode: PropTypes.string,
  rmRecipe: PropTypes.func,
};

CardFavDone.defaultProps = {
  index: null,
  show: true,
  rmRecipe: null,
};

export default CardFavDone;
