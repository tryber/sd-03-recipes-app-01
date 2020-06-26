import React from 'react';
import Header from '../../components/Header';
import { Footer } from '../../components';

function ExploreMainPage() {
  return (
    <div>
      <Header titleTag='Explorar' isSearchablePage={false} />
      <h1>This is ExploreMainPage</h1>
      <Footer />
    </div>
  );
}

export default ExploreMainPage;
