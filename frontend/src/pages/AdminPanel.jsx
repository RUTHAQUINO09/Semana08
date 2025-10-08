import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

const AdminPanel = () => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    apiClient.get('/test/admin')
      .then(response => {
        setContent(response.data);
      })
      .catch(err => {
        const errorMessage = err.response?.data?.message || err.message || 'Error al acceder al panel de administrador.';
        setError(errorMessage);
        console.error("Error fetching admin content:", err);
      });
  }, []);

  return (
    <div className="form-wrapper">
      <h1>Panel de Administrador</h1>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <p><strong>Contenido exclusivo para administradores:</strong> {content}</p>
      )}
    </div>
  );
};

export default AdminPanel;