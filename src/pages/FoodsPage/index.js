import React, { useEffect, useState, useContext } from 'react';
import { Card, CardFilters } from '../../components';
import { Link } from 'react-router-dom';
import { Card, Footer, Loading } from '../../components';
import Header from '../../components/Header';
import { FoodsContext } from '../../contexts/FoodsContext';
import { fetchFoodsApi, fetchCategoriesApi, handleFoodsData, handleCategoriesData } from '../../services/APIs/FOODS_API';

function FoodsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [{ foods }, { setFoods }] = useContext(FoodsContext);

  useEffect(() => {
    fetchFoodsApi()
      .then(({ meals }) => setFoods(meals.map((food) => handleFoodsData(food))))
      .then(() => setLoading(false))
      .catch((err) => { console.log(err); setError(err); });
  }, [setFoods, setLoading]);

  useEffect(() => {
    fetchCategoriesApi()
      .then(({ meals }) => setCategories(meals.map((category) => handleCategoriesData(category))))
      .then(() => setLoading(false))
      .catch((err) => setError(err));
  }, [setLoading]);

  if (error.length > 0) return <h1 data-testid="error-foods-page">Something Went Wrong</h1>;
  if (loading) return <Loading />;

  return (
    <div>
      <div>{Header('Comidas', true)}</div>
      <CardFilters categories={categories} />
      <div>{Header('Comidas', true)}</div>
      {foods.slice(0, 12).map(({ id, name, srcImage }, index) => (
        <Link to={`/comidas/${id}`}>
          <Card key={id} name={name} index={index} srcImage={srcImage} />
        </Link>
      ))}
      <Footer />
    </div>
  );
}

export default FoodsPage;
