import React, { useEffect, useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Card, CardFilters, Header, Footer, Loading } from '../components';
import { FoodsContext } from '../contexts/FoodsContext';
import { fetchApis, handleFoodsData } from '../services/APIs/recipesApi';

const manageState = (loading, foods, error) => {
  if (loading) return <Loading />;
  if (error.length > 0) return <h1 data-testid="error-foods-page">Something Went Wrong</h1>;
  if (foods.length === 1 && !foods[0].name.includes('Goat')) return <Redirect to={`/comidas/${foods[0].id}`} />;
  return false;
};

function FoodsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [{ foods, foodFilter }, { setFoods, setFoodFilter }] = useContext(FoodsContext);

  useEffect(() => {
    fetchApis(foodFilter)
      .then(({ meals }) => setFoods(meals.map((food) => handleFoodsData(food))))
      .then(() => setLoading(false))
      .catch((err) => {
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
        setError(err);
      });
  }, [setFoods, setLoading, foodFilter]);

  useEffect(() => {
    fetchApis('list.php?c=list')
      .then(({ meals }) => meals.map(({ strCategory: category }) => ({ category })))
      .then((arr) => { setCategories(arr); setLoading(false); })
      .catch((err) => { console.log(err); setError(err); });
  }, [setLoading]);

  return (
    manageState(loading, foods, error) ||
    <div>
      <Header titleTag="Comidas" filterMode={setFoodFilter} />
      <CardFilters
        categories={categories}
        filterMode={setFoodFilter}
      />
      {foods
        .slice(0, 12)
        .map(({ id, name, srcImage }, index) => (
          <Link key={id} to={`/comidas/${id}`}>
            <Card name={name} index={index} srcImage={srcImage} />
          </Link>
        ))}
      <Footer />
    </div>
  );
}

export default FoodsPage;
