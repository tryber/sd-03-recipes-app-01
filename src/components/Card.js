import React from 'react';
import PropTypes from 'prop-types';

function Card({ food, index }) {
  const { name, srcImage } = food;
  return (
    <div data-testid={`${index}-recipe-card`}>
      <h3 data-testid={`${index}-card-name`}>{name}</h3>
      <img
        alt="food"
        data-testid={`${index}-card-img`}
        src={srcImage}
      />
    </div>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
};

export default Card;
