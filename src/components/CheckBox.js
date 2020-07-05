import React from 'react';
import PropTypes from 'prop-types';
import './CheckBox.css'

function CheckBox({ ingredient, checked, index, handleClick }) {
  return (
    <label className={checked ? 'line-through' : ''} htmlFor={ingredient}>
      <input
        data-testid={`${index}-ingredient-step`}
        type="checkbox"
        id={ingredient}
        checked={checked}
        onClick={handleClick}
      />
      {ingredient}
    </label>
  );
}

CheckBox.propTypes = {
  ingredient: PropTypes.exact({
    ingredient: PropTypes.string.isRequired,
    measure: PropTypes.string,
  }).isRequired,
  checked: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

CheckBox.defaultProps = { checked: false };

export default CheckBox;
