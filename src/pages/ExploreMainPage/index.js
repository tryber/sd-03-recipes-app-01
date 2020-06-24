import React, {
  useContext,
} from 'react';
import { DrinksContext } from '../../contexts/DrinksContext';

function ExploreMainPage() {
  const context = useContext(
    DrinksContext
  );
  const { state } = context;
  return (<div>{state}</div>);
}

export default ExploreMainPage;
