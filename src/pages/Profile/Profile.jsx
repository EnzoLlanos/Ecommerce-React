import React from 'react';
import './Profile.css';
import useHeader from '../../hooks/useHeader';

function Profile(){
  useHeader({ titulo: "Mi Perfil", mostrarBuscador: false });
  return <div>Mi Perfil</div>;
}

export default Profile