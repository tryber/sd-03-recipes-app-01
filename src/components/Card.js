import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

function Card({ srcImage, name, index, testid, show }) {
  return (
    <div
      className={`card ${show ? '' : ' card-invisible'}`}
      data-testid={testid.title || `${index}-recipe-card`}
    >
      <h3 className="card-title" data-testid={`${index}-card-name`}>
        {name}
      </h3>
      <img
        alt="food"
        className="card-img"
        data-testid={testid.img || `${index}-card-img`}
        src={srcImage}
        width="300px"
      />
    </div>
  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  srcImage: PropTypes.string.isRequired,
  index: PropTypes.number,
  show: PropTypes.bool,
  testid: PropTypes.shape({
    title: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  }),
};

Card.defaultProps = {
  testid: { title: '', img: '' },
  index: null,
  show: true,
};

export default Card;
