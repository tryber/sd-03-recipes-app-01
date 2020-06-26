import React from 'react';
import Header from '../../components/Header';
import { Footer } from '../../components';

function ExploreFoodIngredientsPage() {
  return (
    <div>
      <Header titleTag='Explorar Ingredientes' isSearchablePage={false} />
      <h1>This is ExploreFoodIngredientsPage</h1>
      <Footer />
    </div>
  );
}

export default ExploreFoodIngredientsPage;
