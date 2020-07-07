import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Card.css';


const setURL = (category) => {
  switch (category) {
    case 'all':
      return 'search.php?s=';
    default:
      return `filter.php?c=${category}`;
  }
};

function CardFilters({ categories, filterMode }) {
  const [categorySel, setCategorySel] = useState('all');
  return (
    <div className="backSearch">
      <button
        className="ButtonSearch"
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
      {categories.slice(0, 5).map(({ category }) => (
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

export default CardFilters;
