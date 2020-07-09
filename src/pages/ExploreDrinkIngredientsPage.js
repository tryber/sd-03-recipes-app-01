import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Card, Header, Footer, Loading } from '../components';
import { DrinksContext } from '../contexts/DrinksContext';
import { fetchApis } from '../services/APIs/recipesApi';

const handleRedirect = (name, setDrinkFilter, setRedirect) => {
  const search = `filter.php?i=${name}`;
  setDrinkFilter(search);
  setRedirect(true);
};

function ExploreDrinkIngredientsPage() {
  const [loading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [, { setDrinkFilter }] = useContext(DrinksContext);

  useEffect(() => {
    fetchApis('list.php?i=list')
      .then(({ drinks }) =>
        drinks.map(({ strIngredient1: ingredient }) => ({
          name: ingredient,
          srcImage: `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`,
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
  if (redirect) return <Redirect to="/bebidas" />;

  return (
    <div>
      <Header titleTag="Explorar Ingredientes" />
      {ingredients.slice(0, 12).map(({ name, srcImage }, index) => (
        <button key={name} onClick={() => handleRedirect(name, setDrinkFilter, setRedirect)}>
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

export default ExploreDrinkIngredientsPage;
