import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import { Footer } from '../../components';
import './Explorer.css';

function ExploreMainPage() {
  return (
    <center>
      <div>
        <Header titleTag="Explorar" />
        <Link to="/explorar/comidas" style={{ textDecoration: "none" }}>
          <button className="explorer" data-testid="explore-food">Explorar Comidas</button>
        </Link>
        <Link to="/explorar/bebidas" style={{ textDecoration: "none" }}>
          <button className="explorer" data-testid="explore-drinks">Explorar Bebidas</button>
        </Link>
        <Footer />
      </div>
    </center>
  );
}

export default ExploreMainPage;
