import React, {
  createContext,
  useState,
} from 'react';
import PropTypes from 'prop-types';

export const FoodsContext = createContext();

export function FoodsProvider({
  children,
}) {
  const [state, setState] = useState(
    'food',
  );

  const context = {
    state,
    setState,
  };

  return (
    <FoodsContext.Provider value={context}>
      {children}
    </FoodsContext.Provider>
  );
}

FoodsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
