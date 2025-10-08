import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../api/apiClient';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiClient.post('/auth/signin', {
        username,
        password,
      });

      // El backend no retorna el objeto 'user', solo los campos.
      // Creamos un objeto user para almacenarlo.
      const { accessToken, ...userData } = response.data;
      const userToStore = { ...userData };
      
      localStorage.setItem('user', JSON.stringify({ token: accessToken, details: userToStore }));
      
      // Forzamos la recarga de la página para que el estado de App.jsx se actualice
      window.location.href = '/dashboard';

    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al iniciar sesión. Revisa tus credenciales.';
      setError(errorMessage);
      setShake(true);
      setTimeout(() => setShake(false), 500); // Reset shake animation
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`form-wrapper ${shake ? 'form-shake' : ''}`}>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder=" "
          />
          <label htmlFor="username">Usuario</label>
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder=" "
          />
          <label htmlFor="password">Contraseña</label>
        </div>
        
        {error && <p className="error-message">{error}</p>}
        
        <button type="submit" disabled={loading} style={{ width: '100%', padding: '15px' }}>
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
       <div className="form-footer">
        <p>¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
      </div>

      {/* --- Datos de Prueba Añadidos --- */}
      <div style={{ 
          marginTop: '1.5rem', 
          padding: '1rem', 
          backgroundColor: '#fdf9ff', 
          border: '1px dashed #A48AD6',
          borderRadius: '8px',
          textAlign: 'center',
          fontSize: '0.9rem',
          color: '#6c528e'
        }}>
        <h4 style={{ marginBottom: '0.75rem', color: '#4a2c6d', fontWeight: '500' }}>Datos de Prueba</h4>
        <p style={{ margin: '0.25rem 0' }}><strong>Usuario:</strong> usuario / <strong>Pass:</strong> Usuario12345</p>
        <p style={{ margin: '0.25rem 0' }}><strong>Mod:</strong> mod / <strong>Pass:</strong> Mod12345</p>
        <p style={{ margin: '0.25rem 0' }}><strong>Admin:</strong> admin / <strong>Pass:</strong> Admin12345</p>
      </div>

    </div>
    
  );
};

export default Login;