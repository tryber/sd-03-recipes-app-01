import React, {
  createContext,
  useState,
} from 'react';
import PropTypes from 'prop-types';

export const DrinksContext = createContext();

export function DrinksProvider({
  children,
}) {
  const [state, setState] = useState(
    'drinks',
  );

  const context = {
    state,
    setState,
  };

  return (
    <DrinksContext.Provider value={context}>
      {children}
    </DrinksContext.Provider >
  );
}

DrinksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
