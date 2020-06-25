import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

import Card from './Card';

import { handleDrinksData } from '../services/APIs/DRINKS_API';
import { handleFoodsData } from '../services/APIs/FOODS_API';

function DetailsCard({ eat, type }) {
  const [recomends, setRecomends] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let url = '';
    if (type === 'food') url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    if (type === 'drink') url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    fetch(url).then((res) => res.json())
      .then((obj) => {
        let arr = [];
        Object.entries(obj).map(([key, value]) => {
          if (key === 'drinks') arr = value.slice(0, 2).map((drk) => handleDrinksData(drk));
          if (key === 'meals') arr = value.slice(0, 2).map((meal) => handleFoodsData(meal));
        });
        setRecomends(arr);
      }).then(() => setLoading(false))
      .catch((err) => { console.log(err); setError(err) });
  }, [])

  const { id, name, srcImage, video, category, ingredients, instructions } = eat;

  return (
    <div>
      <Card key={id} name={name} index={-100} srcImage={srcImage} />
      <p>Category: {category}</p>
      <ul>
        {ingredients.map(({ ingredient, measure }) => (
          <li key={ingredient}>{ingredient} -> {measure}</li>
        ))}
      </ul>
      <p>{instructions}</p>
      {video && <ReactPlayer url={video} />}
      {error.length > 0 && <h3>Aconteceu algo errado em detalhes de comida</h3>}
      {!error && loading && <h3>Carrgando detalhes de comida...</h3>}
      {!error && !loading && recomends && recomends.map(({ name: n, srcImage: src }, i) => (
        <Card key={name} name={n} srcImage={src} index={i} />
      ))}
    </div>
  );
}

export default DetailsCard;
