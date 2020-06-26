import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Card from './Card';
import './Carrosel.css';

function Carrosel({ cards }) {
  const [index, setIndex] = useState(1);

  return (
    <div className="scroll">
      {cards.map(({ id, name, srcImage }, ind) => (
        <Card
          index={ind}
          key={id}
          name={name}
          show={(index * 2) - 2 <= ind && ind <= (index * 2) - 1}
          srcImage={srcImage}
          testid={{ title: `${ind}-recomendation-title`, img: `${ind}-recomendation-card` }}
        />
      ))}
      <div className="dots-containers">
        <button className={`dot ${index === 1 ? 'active' : ''}`} onClick={() => setIndex(1)} />
        <button className={`dot ${index === 2 ? 'active' : ''}`} onClick={() => setIndex(2)} />
        <button className={`dot ${index === 3 ? 'active' : ''}`} onClick={() => setIndex(3)} />
      </div>
      <button className="prev" onClick={() => setIndex(index === 1 ? 3 : index - 1)}>
        &#10094;
      </button>
      <button className="next" onClick={() => setIndex(index === 3 ? 1 : index + 1)}>
        &#10095;
      </button>
    </div>
  );
}

Carrosel.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // number as string
      name: PropTypes.string.isRequired,
      srcImage: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default Carrosel;
