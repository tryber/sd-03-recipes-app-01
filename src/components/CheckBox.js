import React from 'react';
import PropTypes from 'prop-types';
import './CheckBox.css';

function CheckBox({ item, checked, index, handleChange }) {
  return (
    <label
      data-testid={`${index}-ingredient-step`}
      className={checked ? 'line-through' : ''}
      htmlFor={item}
    >
      <input type="checkbox" id={item} checked={checked} value={index} onChange={handleChange} />
      {item}
    </label>
  );
}

CheckBox.propTypes = {
  item: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

CheckBox.defaultProps = { checked: false };

export default CheckBox;
