import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import './Card.css';

import Card from './Card';
import ShareIcon from './ShareIcon';
import FavoriteIcon from './FavoriteIcon';

import { getInProgress, doneRecipes } from '../services/APIs/APIlocalStorage';

function DetailsCard({ eat, type }) {
  const { id, name, srcImage, video, category, ingredients, instructions, isAlcoholic } = eat;

  return (
    <div className="backDetal">
      <Card
        name={name}
        srcImage={srcImage}
        testid={{ title: 'recipe-title', img: 'recipe-photo' }}
      />
      <ShareIcon textToCopy={window.location.href} />
      <FavoriteIcon eat={eat} type={type} />
      <p data-testid="recipe-category">{isAlcoholic || category}</p>
      <ul>
        {ingredients.map(({ ingredient, measure }, index) => (
          <li className="ig" data-testid={`${index}-ingredient-name-and-measure`} key={ingredient}>
            {ingredient} {measure}
          </li>
        ))}
      </ul>
      <p className="instructions" data-testid="instructions">{instructions}</p>
      {video && <div data-testid="video"><p className="ytb"><ReactPlayer url={video} /></p></div>}
      {Boolean(doneRecipes(id)) ||
        <Link to={`${type === 'food' ? '/comidas' : '/bebidas'}/${id}/in-progress`}>
          <button
            data-testid="start-recipe-btn"
            className="buttonIniciar"
          >{getInProgress(type)[id] ? 'Continuar Receita' : 'Iniciar Receita'}</button>
        </Link>
      }
    </div>
  );
}

DetailsCard.propTypes = {
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

DetailsCard.defaultProps = {
  eat: { source: null, isAlcoholic: null, origin: '', video: '' },
};

export default DetailsCard;
