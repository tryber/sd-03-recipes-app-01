import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import './Card.css';

import Card from './Card';
import ShareIcon from './ShareIcon';
import FavoriteIcon from './FavoriteIcon';

import { getInProgress, doneRecipes, translateType } from '../services/APIs/APIlocalStorage';

const beginRecipeBtn = (id, type) => (
  Boolean(doneRecipes(id)) ||
    <Link to={`/${translateType(type)}s/${id}/in-progress`}>
      <button
        data-testid="start-recipe-btn"
        className="buttonIniciar"
      >{getInProgress(type)[id] ? 'Continuar Receita' : 'Iniciar Receita'}</button>
    </Link>
);

function DetailsCard({ recipe, type }) {
  const { id, name, srcImage, video, category, ingredients, instructions, isAlcoholic } = recipe;

  return (
    <div>
      <Card
        name={name}
        srcImage={srcImage}
        testid={{ title: 'recipe-title', img: 'recipe-photo' }}
      />
      <ShareIcon textToCopy={window.location.href} />
      <FavoriteIcon recipe={recipe} type={translateType(type)} />
      <p data-testid="recipe-category">{isAlcoholic || category}</p>
      <ul>
        {ingredients.map(({ ingredient, measure }, index) => (
          <li data-testid={`${index}-ingredient-name-and-measure`} key={ingredient}>
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
      <p data-testid="instructions">{instructions}</p>
      {video && <div data-testid="video" className="ytb"><ReactPlayer url={video} /></div>}
      {beginRecipeBtn(id, type)}
    </div>
  );
}

DetailsCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
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
  recipe: { source: null, isAlcoholic: null, origin: '', video: '' },
};

export default DetailsCard;
