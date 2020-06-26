import React from 'react';
import Header from '../../components/Header';
import { Footer } from '../../components';

function ExploreDrinkPage() {
  return (
    <div>
      <Header titleTag='Explorar Bebidas' isSearchablePage={false} />
      <h1>This is ExploreDrinkPage</h1>
      <Footer />
    </div>
  );
}

export default ExploreDrinkPage;
