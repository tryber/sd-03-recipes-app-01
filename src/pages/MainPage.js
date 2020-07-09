import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import useRequisition from '../hooks/requisition';
import { Card, CardFilters, Header, Footer, Loading } from '../components';

import { typeShape } from '../services/APIs/shapes';
import { handleCategs, handleData, translateType, createURL } from '../services/APIs/recipesApi';

const dplMsn = () => alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');

function MainPage({ type }) {
  const [{ loading, error, recipe }] = useRequisition(
    createURL(type), handleData, [type], console.log,
  );
  const [{ loading: loadCats, error: errCats, recipe: categories }] = useRequisition(
    createURL(type, 'list.php?c=list'), handleCategs, [type], dplMsn,
  );

  if (error) return <h1 data-testid="error-recipe-page">Something Went Wrong</h1>;
  if (loading) return <Loading />;
  if (recipe.length === 1) return <Redirect to={`/${translateType(type)}s/${recipe[0].id}`} />;
  return (
    <div>
      <Header titleTag={`${translateType(type)}s`} />
      { loadCats ? <Loading /> :
        errCats ? <h1>Something went wrong</h1> :
        <CardFilters type={type} categories={categories} />
      }
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
