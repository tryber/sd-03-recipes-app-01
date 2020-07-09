import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Card, Header, Footer, Loading } from '../components';
import { FoodsContext } from '../contexts/FoodsContext';
import { fetchApis } from '../services/APIs/FOODS_API';

const handleRedirect = (name, setFoodFilter, setRedirect) => {
  const search = `filter.php?i=${name}`;
  setFoodFilter(search);
  setRedirect(true);
};

function ExploreFoodIngredientsPage() {
  const [loading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [, { setFoodFilter }] = useContext(FoodsContext);

  useEffect(() => {
    fetchApis('list.php?i=list')
      .then(({ meals }) =>
        meals.map(({ strIngredient: ingredient }) => ({
          name: ingredient,
          srcImage: `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`,
        })),
      )
      .then((arr) => {
        setIngredients(arr);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setLoading]);

  if (loading) return <Loading />;
  if (redirect) return <Redirect to="/comidas" />;
  return (
    <div>
      <Header titleTag="Explorar Ingredientes" />
      {ingredients.slice(0, 12).map(({ name, srcImage }, index) => (
        <button key={name} onClick={() => handleRedirect(name, setFoodFilter, setRedirect)}>
          <Card
            name={name}
            index={index}
            srcImage={srcImage}
            testid={{ title: `${index}-ingredient-card` }}
          />
        </button>
      ))}
      <Footer />
    </div>
  );
}

export default ExploreFoodIngredientsPage;
