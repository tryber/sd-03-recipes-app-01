import React from 'react';
import PropTypes from 'prop-types';

function CardFilters({ categories, categorySel, setCategorySel }) {
  return (
    <div>
      <button type='button' value='all' onClick={({ target: { value } }) => setCategorySel(value)}>
        All
      </button>
      {categories.slice(0, 5).map(({ category }) => (
        <button
          type='button'
          data-testid={`${category}-category-filter`}
          value={category}
          onClick={({ target: { value } }) => {
            if (categorySel === value) {
              return setCategorySel('all');
            } else {
              return setCategorySel(value);
            }
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
  categorySel: PropTypes.string.isRequired,
  setCategorySel: PropTypes.func.isRequired,
};

export default CardFilters;
