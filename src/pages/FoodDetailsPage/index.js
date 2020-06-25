import React, { useState } from 'react';

function FoodDetailsPage({ location: { match: { id } } }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [food, setFood] = useState({});

  useEffect(() => {
    fetchetailFood(id)
      .then((food) => console.log(food))
      .then(() => setLoading(true))
      .catch((err) => { console.log(err); setError(err); })
  }, []);

  if (loading) return <h1>Carrgando detalhesde comida...</h1>;
  if (error) return <h1>Aconteceu algo errado em detalhes de comida</h1>;
  return (
    <div>
      
    </div>
  );
}

export default FoodDetailsPage;
