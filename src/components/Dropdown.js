import React from 'react';
import PropTypes from 'prop-types';

const setURL = (area) => {
  switch (area) {
    case 'all':
      return 'search.php?s=';
    default:
      return `filter.php?a=${area}`;
  }
};

function Dropdown({ areas, filterMode }) {
  return (
    <div>
      <select
        onChange={({ target: { value } }) => filterMode(setURL(value))}
        data-testid="explore-by-area-dropdown"
      >
        <option value="all" data-testid="All-areas-filter">
          All
        </option>
        {areas.map(({ area }) => (
          <option key={area} data-testid={`${area}-option`} value={area}>
            {area}
          </option>
        ))}
      </select>
    </div>
  );
}

Dropdown.propTypes = {
  areas: PropTypes.instanceOf(Array).isRequired,
  filterMode: PropTypes.func.isRequired,
};

export default Dropdown;
