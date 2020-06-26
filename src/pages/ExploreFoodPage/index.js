import React from 'react';
import Header from '../../components/Header';
import { Footer } from '../../components';

function ExploreFoodPage() {
  return (
    <div>
      <Header titleTag='Explorar Comidas' isSearchablePage={false} />
      <h1>This is ExploreFoodPage</h1>
      <Footer />
    </div>
  );
}

export default ExploreFoodPage;
