import React from 'react';
import { Footer } from '../../components';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';



function ProfilePage() {
  const getLocal = localStorage.getItem('user')

  return (
    <div>
      <center>
        <Header titleTag="Perfil" />
        <h1>{getLocal}</h1>
        <Link to="/receitas-feitas">
          <button data-testid="profile-done-btn">Receitas Feitas</button>
        </Link>
        <Link to="/receitas-favoritas">
          <button data-testid="profile-favorite-btn">Receitas Favoritas</button>
        </Link>
        <Link to="/">
          <button data-testid="profile-logout-btn" >Sair</button>
        </Link>
        <Footer />
      </center>
    </div>
  );
}

export default ProfilePage;
