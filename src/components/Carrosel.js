import React from 'react';
import PropTypes from 'prop-types';

function Carrosel({ index }) {
  return (
    <div className="dots-containers">
      <span
        className={`dot ${index === 1 ? 'active' : ''}`}
        onClick={() => setSlideIndex(1)}
      />
      <span
        className={`dot ${index === 2 ? 'active' : ''}`}
        onClick={() => setSlideIndex(2)}
      />
      <span
        className={`dot ${index === 3 ? 'active' : ''}`}
        onClick={() => setSlideIndex(3)}
      />
      <button
        className="prev"
        onClick={() => setSlideIndex(index === 1 ? 3 : index - 1)}
      >
        &#10094;
      </button>
      <button
        className="next"
        onClick={() => setSlideIndex(index === 3 ? 1 : index + 1)}
      >
        &#10095;
      </button>
    </div>
  );
}

Carrosel.defaultProps = {
  index: PropTypes.num.isRequired,
};

export default Carrosel;
