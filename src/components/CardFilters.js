import React, { useState } from 'react';
import { handleCategs } from '../services/APIs/recipesApi';
import PropTypes from 'prop-types';
import useRequisition from '../hooks/requisition';
import { Loading } from '../components';

const setURL = (category) => {
  switch (category) {
    case 'all':
      return 'search.php?s=';
    default:
      return `filter.php?c=${category}`;
  }
};

const dplMsn = () => alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');

function CardFilters({ type, filterMode = () => null }) {
  const [categorySel, setCategorySel] = useState('all');
  const [{ loading, error, recipe: categories }] = useRequisition(
    [type, 'list.php?c=list'], handleCategs, dplMsn,
  );

  if (error) return <h1>Something went wrong</h1>;
  if (loading) return <Loading />;
  return (
    <div>
      <button
        type="button"
        value="all"
        data-testid="All-category-filter"
        onClick={({ target: { value } }) => {
          filterMode(setURL(value));
          setCategorySel('all');
        }}
      >
        All
      </button>
      {categories.slice(0, 5).map((category) => (
        <button
          key={category}
          type="button"
          data-testid={`${category}-category-filter`}
          value={category}
          onClick={({ target: { value } }) => {
            if (categorySel === value) {
              setCategorySel('all');
              return filterMode(setURL('all'));
            }
            setCategorySel(value);
            return filterMode(setURL(value));
          }}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

CardFilters.propTypes = {
  categories: PropTypes.instanceOf(Array).isRequired,
  filterMode: PropTypes.func.isRequired,
};

CardFilters.defaultProps = { categories: [] };

export default CardFilters;
