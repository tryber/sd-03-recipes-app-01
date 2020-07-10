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
      <center>
        <Header titleTag="Perfil" />
        <h1 className="Perfil" data-testid="profile-email">{email}</h1>
        <Link to="/receitas-feitas" className="Link">
          <button className="Email" data-testid="profile-done-btn">Receitas Feitas</button>
        </Link>
        <Link to="/receitas-favoritas" className="Link">
          <button className="Email" data-testid="profile-favorite-btn">Receitas Favoritas</button>
        </Link>
        <Link to="/" className="Link">
          <button
            className="Email"
            data-testid="profile-logout-btn"
            onClick={() => clearUP()}
          >
            Sair
            </button>
        </Link>
        <Footer />
      </center>
    </div>
  );
}

export default ProfilePage;
