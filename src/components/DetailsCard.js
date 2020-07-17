import React from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';

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
      <ShareIcon textToCopy={window.location.href} testid="share-btn" />
      <FavoriteIcon recipe={recipe} type={type} />
      <p data-testid="recipe-category">{isAlcoholic || category}</p>
      <ul>
        {ingredients.map(({ name, measure }, index) => (
          <li data-testid={`${index}-ingredient-name-and-measure`} key={name}>
            {name} {measure}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{instructions}</p>
      {video && <div data-testid="video"><ReactPlayer url={video} /></div>}
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
        name: PropTypes.string.isRequired,
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
