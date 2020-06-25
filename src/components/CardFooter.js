import React from 'react';
import PropTypes from 'prop-types';

function CardFooter({ srcImage, name, index }) {
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
  name: PropTypes.string.isRequired,
  srcImage: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default CardFooter;
