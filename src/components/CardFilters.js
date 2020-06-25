import React from 'react';
import PropTypes from 'prop-types';

function CardFilters({ categories }) {
  return (
    <div>
      <button type="button">All</button>
      {categories.slice(0, 5).map(({ category }) => (
        <button
          type="button"
          data-testid={`${category}-category-filter`}
          value={category}
          onClick={({ target: { value } }) => console.log(value)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

CardFilters.propTypes = {
  categories: PropTypes.instanceOf(Array).isRequired,
};

export default CardFilters;
