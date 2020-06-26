import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

import Card from './Card';

import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

import { handleDrinksData } from '../services/APIs/DRINKS_API';
import { handleFoodsData } from '../services/APIs/FOODS_API';
import './DetailsCard.css';

function DetailsCard({ eat, type }) {
  const [recomends, setRecomends] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [slideIndex, setSlideIndex] = useState(1);
  const [favorite, setFavorite] = useState(false);
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    let url = '';
    if (type === 'food') url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    if (type === 'drink') url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

    fetch(url).then((res) => res.json())
      .then((obj) => {
        let arr = [];
        Object.entries(obj).forEach(([key, value]) => {
          if (key === 'drinks') arr = value.slice(0, 6).map((drk) => handleDrinksData(drk));
          if (key === 'meals') arr = value.slice(0, 6).map((meal) => handleFoodsData(meal));
        });
        setRecomends(arr);
      }).then(() => setLoading(false))
      .catch((err) => { console.log(err); setError(err); });
  }, [type]);

  const {
    id,
    name,
    srcImage,
    video,
    category,
    ingredients,
    instructions,
    isAlcoholic,
    source,
  } = eat;

  useEffect(() => {
    if (copy) {
      navigator.clipboard.writeText(source)
        .then(() => console.log('copy succes'))
        .then(() => setCopy(false))
        .catch((err) => console.log('Não foi possível copiar', err));
    }
  }, [copy]);

  return (
    <div>
      <Card
        key={id}
        name={name}
        index={-100}
        srcImage={srcImage}
        testid={{ title: 'recipe-title', img: 'recipe-photo' }}
      />
      <div>
        {favorite
          ? <img src={blackHeartIcon} onClick={() => setFavorite(false)} />
          : <img src={whiteHeartIcon} onClick={() => setFavorite(true)} />
        }
          <span>
            <span className="tooltiptext">Copiar</span>
            <img className="tooltip" src={shareIcon} onClick={() => setCopy(true)} />
          </span>
        {source ? <a href={source}>Link para a receita</a> : `dosen1t have link to source`}
      </div>
      <p data-testid="recipe-category">Category: {category}</p>
      {(typeof isAlcoholic === 'boolean') && <p>{isAlcoholic ? 'Alcoholic' : 'No Alcoholic'}</p>}
      <ul>
        {ingredients.map(({ ingredient, measure }, index) => (
          <li data-testid={`${index}-ingredient-name-and-measure`} key={ingredient}>
            {ingredient} {measure}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{instructions}</p>
      {video && <div data-testid="video"><ReactPlayer url={video} /></div>}
      {error.length > 0 && <h3>Aconteceu algo errado em detalhes de comida</h3>}
      {!error && loading && <h3>Carrgando detalhes de comida...</h3>}
      <div className="scroll" onScroll={(e) => console.log(e)}>
        {!error && !loading && recomends && recomends.map(({ id, name: n, srcImage: src }, i) => (
          <Card
            index={i}
            key={id}
            name={n}
            show={(slideIndex * 2) - 2 <= i && i <= (slideIndex * 2) - 1}
            srcImage={src}
            testid={{ title: `${i}-recomendation-title`, img: `${i}-recomendation-card` }}
          />
        ))}
        <a className="prev" onClick={() => setSlideIndex(slideIndex === 1 ? 3 : slideIndex - 1)}>
          &#10094;
        </a>
        <a className="next" onClick={() => setSlideIndex(slideIndex === 3 ? 1 : slideIndex + 1)}>
          &#10095;
        </a>
        <div className="dots-containers" style={{ textAlign: 'center' }}>
          <span className={'dot' + (slideIndex === 1 ? ' active' : '')} onClick={() => setSlideIndex(1)} />
          <span className={'dot' + (slideIndex === 2 ? ' active' : '')} onClick={() => setSlideIndex(2)} />
          <span className={'dot' + (slideIndex === 3 ? ' active' : '')} onClick={() => setSlideIndex(3)} />
        </div>
      </div>
    </div>
  );
}

DetailsCard.propTypes = {
  eat: PropTypes.shape({
    id: PropTypes.string.isRequired, // number as string
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    instructions: PropTypes.string.isRequired,
    origin: PropTypes.string,
    srcImage: PropTypes.string.isRequired,
    video: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(
      PropTypes.objectOf(
        PropTypes.string.isRequired,
      ).isRequired,
    ).isRequired,
    isAlcoholic: PropTypes.bool,
  }).isRequired,
  type: PropTypes.oneOf(['food', 'drink']).isRequired,
};

DetailsCard.defaultProps = {
  eat: { isAlcoholic: null, origin: '', video: '' },
}

export default DetailsCard;
