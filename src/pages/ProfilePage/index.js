import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../../components';
import Header from '../../components/Header';

function ProfilePage() {
  const getLocal = localStorage.getItem('user');

  const clearUP = () => {
    localStorage.clear();
  };

  return (
    <div>
      <center>
        <Header titleTag="Perfil" />
        <h1 data-testid="profile-email">{getLocal}</h1>
        <Link to="/receitas-feitas">
          <button data-testid="profile-done-btn">Receitas Feitas</button>
        </Link>
        <Link to="/receitas-favoritas">
          <button data-testid="profile-favorite-btn">Receitas Favoritas</button>
        </Link>
        <Link to="/">
          <button data-testid="profile-logout-btn" onClick={() => clearUP()} >Sair</button>
        </Link>
        <Footer />
      </center>
    </div>
  );
}

export default ProfilePage;
