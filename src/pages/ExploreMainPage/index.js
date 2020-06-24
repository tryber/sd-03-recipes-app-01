import React, {
  useContext,
} from 'react';
import { DrinksContext } from '../../contexts/DrinksContext';

function ExploreMainPage() {
  const context = useContext(
    DrinksContext
  );
  const { state } = context;
  return (<div>TESTE</div>);
}

export default ExploreMainPage;
