import React from 'react';
import PropTypes from 'prop-types';

function CardFilters({ categories, setCategorySel }) {
  return (
    <div>
      <button type="button" value="all" onClick={({ target: { value } }) => setCategorySel(value)}>
        All
      </button>
      {categories.slice(0, 5).map(({ category }) => (
        <button
          type="button"
          data-testid={`${category}-category-filter`}
          value={category}
          onClick={({ target: { value } }) => setCategorySel(value)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

CardFilters.propTypes = {
  categories: PropTypes.instanceOf(Array).isRequired,
  setCategorySel: PropTypes.func.isRequired,
};

export default CardFilters;
