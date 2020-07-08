import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../../components';
import Header from '../../components/Header';
import './Profile.css';

function ProfilePage() {
  const email = (JSON.parse(localStorage.getItem('user')) || { email: null }).email;

  const clearUP = () => {
    localStorage.clear();
  };

  return (
    <div>
      <Header titleTag="Perfil" style={{ textDecoration: 'none' }} />
      <h1 className="Email" data-testid="profile-email">{email}</h1>
      <Link to="/receitas-feitas" style={{ textDecoration: 'none' }} >
        <button className="Perfil" data-testid="profile-done-btn">Receitas Feitas</button>
      </Link>
      <Link to="/receitas-favoritas" style={{ textDecoration: 'none' }} >
        <button className="Perfil" data-testid="profile-favorite-btn">Receitas Favoritas</button>
      </Link>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <button
          className="Perfil"
          data-testid="profile-logout-btn"
          onClick={() => clearUP()}
          >Sair
          </button>
      </Link>
      <Footer />
    </div>
  );
}

export default ProfilePage;
