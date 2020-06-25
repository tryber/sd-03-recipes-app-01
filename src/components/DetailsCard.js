import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

import Card from './Card';

import { handleDrinksData } from '../services/APIs/DRINKS_API';

function DetailsCard({ food }) {
  const [recomends, setRecomends] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((res) => res.json())
      .then(({ drinks: [a, b] }) => setRecomends([a, b].map((drk) => handleDrinksData(drk))))
      .then(() => setLoading(false))
      .catch((err) => { console.log(err); setError(err) });
  }, [])

  const { id, name, srcImage, video, category, ingredients, instructions } = food;
  console.log(video)
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
      <ReactPlayer url={video} />
      {error.length > 0 && <h3>Aconteceu algo errado em detalhes de comida</h3>}
      {!error && loading && <h3>Carrgando detalhes de comida...</h3>}
      {!error && !loading && recomends && recomends.map(({ name: n, srcImage: src }, i) => (
        <Card key={name} name={n} srcImage={src} index={i} />
      ))}
    </div>
  );
}

export default DetailsCard;
