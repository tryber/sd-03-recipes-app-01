import React from 'react';
import PropTypes from 'prop-types';

function Card({ srcImage, name, index, testid }) {
  return (
    <div data-testid={testid.title || `${index}-recipe-card`}>
      <h3 data-testid={`${index}-card-name`}>{name}</h3>
      <img
        alt="food"
        data-testid={testid.img || `${index}-card-img`}
        src={srcImage}
      />
    </div>
  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  srcImage: PropTypes.string.isRequired,
  index: PropTypes.number,
  testid: PropTypes.shape({
    title: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  }),
};

Card.defaultProps = {
  testid: { title: false, img: false },
  index: null,
};

export default Card;
