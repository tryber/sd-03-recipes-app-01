import React from 'react';
import { Footer } from '../../components';
import Header from '../../components/Header';

function ProfilePage() {
  return (
    <div>
      <Header titleTag="Perfil" isSearchablePage={false} />
      <h1>This is ProfilePage</h1>
      <Footer />
    </div>
  );
}

export default ProfilePage;
