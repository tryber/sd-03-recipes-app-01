import React from 'react';
import Header from '../../components/Header';
import { Footer } from '../../components';

function ExploreFoodAreaPage() {
  return (
    <div>
      <Header titleTag='Explorar Origem' isSearchablePage={true} />
      <h1>This is ExploreFoodAreaPage</h1>
      <Footer />
    </div>
  );
}

export default ExploreFoodAreaPage;
