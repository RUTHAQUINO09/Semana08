import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';
import * as AuthService from '../utils/auth';

const Dashboard = () => {
  const [content, setContent] = useState('');
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    apiClient.get('/test/user')
      .then(response => {
        setContent(response.data);
      })
      .catch(error => {
        console.error("Error fetching user content:", error);
        setContent('No se pudo cargar el contenido del usuario.');
      });
  }, []);

  return (
    <div className="form-wrapper" style={{textAlign: 'center'}}>
      <h1>Dashboard</h1>
      <p>Bienvenido, <strong>{currentUser.username}</strong>!</p>
      <p>Este es tu panel de control, accesible solo para usuarios autenticados.</p>
      <hr style={{margin: '1rem 0'}}/>
      <p><strong>Contenido del servidor:</strong></p>
      <p><em>{content}</em></p>
    </div>
  );
};

export default Dashboard;