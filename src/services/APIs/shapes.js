import PropTypes from 'prop-types';

export const ingredientShape = {
  ingredient: PropTypes.string.isRequired,
  measure: PropTypes.string,
};

export const eatShape = {
  id: PropTypes.string.isRequired, // number as string
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  instructions: PropTypes.string.isRequired,
  origin: PropTypes.string,
  video: PropTypes.string,
  srcImage: PropTypes.string.isRequired,
  source: PropTypes.string,
  ingredients: PropTypes.arrayOf(
    PropTypes.shape(ingredientShape).isRequired,
  ).isRequired,
  isAlcoholic: PropTypes.string,
};

export const typeShape = PropTypes.oneOf(['meal', 'drink']);
