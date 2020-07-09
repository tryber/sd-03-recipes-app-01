import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import useRequisition from '../hooks/requisition';
import { Card, CardFilters, Header, Footer, Loading } from '../components';

import { typeShape } from '../services/APIs/shapes';
import { handleData, translateType } from '../services/APIs/recipesApi';

function MainPage({ type }) {
  const [{ loading, error, recipe }] = useRequisition([type], handleData);

  if (error) return <h1 data-testid="error-recipe-page">Something Went Wrong</h1>;
  if (loading) return <Loading />;
  if (recipe.length === 1) return <Redirect to={`/${translateType(type)}s/${recipe[0].id}`} />;
  return (
    <div>
      <Header titleTag={`${translateType(type)}s`} />
      <CardFilters type={type} />
      {recipe.slice(0, 12).map(({ id, name, srcImage }, index) => (
        <Link key={id} to={`/${translateType(type)}s/${id}`}>
          <Card name={name} index={index} srcImage={srcImage} />
        </Link>
      ))}
      <Footer />
    </div>
  );
}

MainPage.propTypes = { type: typeShape.isRequired };

export default MainPage;
