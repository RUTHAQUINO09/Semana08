import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

const ModeratorPanel = () => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    apiClient.get('/test/mod')
      .then(response => {
        setContent(response.data);
      })
      .catch(err => {
        const errorMessage = err.response?.data?.message || err.message || 'Error al acceder al panel de moderador.';
        setError(errorMessage);
        console.error("Error fetching moderator content:", err);
      });
  }, []);

  return (
    <div className="form-wrapper">
      <h1>Panel de Moderador</h1>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <p><strong>Contenido exclusivo para moderadores:</strong> {content}</p>
      )}
    </div>
  );
};

export default ModeratorPanel;