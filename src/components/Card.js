import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

function Card({ srcImage, name, index, testid, show }) {
  return (
    <div
      className={`card ${show ? '' : 'card-invisible'}`}
      data-testid={testid.title || `${index}-recipe-card`}
    >
      <h3 className="card-title cssNew" data-testid={`${index}-card-name`}>
        {name}
      </h3>
      <img
        alt="food"
        className="card-img"
        data-testid={testid.img || `${index}-card-img`}
        src={srcImage}
<<<<<<< HEAD
        width="100%"
=======
<<<<<<< HEAD
        width="100%"
=======
>>>>>>> c2bdab2df9974a803118bc50e73df408d4da33af
>>>>>>> master
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
    title: PropTypes.string,
    img: PropTypes.string,
  }),
};

Card.defaultProps = {
  testid: { title: '', img: '' },
  index: null,
  show: true,
};

export default Card;
