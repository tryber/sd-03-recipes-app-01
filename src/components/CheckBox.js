import React from 'react';
import PropTypes from 'prop-types';

function CheckBox({ ingredients }) {
  return (
    <ul>{ingredients.map((el, index) => (
      <label htmlFor={el.ingredient} key={el.ingredient}>
        <input data-testid={`${index}-ingredient-step`} type="checkbox" id={el.ingredient} />
        {el.ingredient}
      </label>
    ))}
    </ul>
  );
}

CheckBox.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.exact({
      ingredient: PropTypes.string.isRequired,
      measure: PropTypes.string,
    }).isRequired,
  ).isRequired,
}

export default CheckBox;
