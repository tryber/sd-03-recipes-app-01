import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { Footer } from '../components';

function ExploreMainPage() {
  return (
    <center>
      <div>
        <Header titleTag="Explorar" />
        <Link to="/explorar/comidas">
          <button data-testid="explore-food">Explorar Comidas</button>
        </Link>
        <Link to="/explorar/bebidas">
          <button data-testid="explore-drinks">Explorar Bebidas</button>
        </Link>
        <Footer />
      </div>
    </center>
  );
}

export default ExploreMainPage;
