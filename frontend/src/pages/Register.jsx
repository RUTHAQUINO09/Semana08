import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiClient from '../api/apiClient';
import { isEmail, isStrongPassword } from '../utils/validators';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!username) newErrors.username = 'El nombre de usuario es requerido.';
    if (!isEmail(email)) newErrors.email = 'El correo electrónico no es válido.';
    if (!isStrongPassword(password)) newErrors.password = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm()) {
        setShake(true);
        setTimeout(() => setShake(false), 500);
        return;
    }

    setLoading(true);
    try {
      await apiClient.post('/auth/signup', {
        username,
        email,
        password,
      });
      navigate('/login');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error en el registro. Inténtalo de nuevo.';
      setApiError(errorMessage);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`form-wrapper ${shake ? 'form-shake' : ''}`}>
      <h1>Crear Cuenta</h1>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder=" " />
          <label htmlFor="username">Usuario</label>
          {errors.username && <p className="error-message">{errors.username}</p>}
        </div>
        <div className="form-group">
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder=" "/>
          <label htmlFor="email">Email</label>
           {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder=" "/>
          <label htmlFor="password">Contraseña</label>
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <div className="form-group">
          <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder=" "/>
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
        </div>
        
        {apiError && <p className="error-message">{apiError}</p>}
        
        <button type="submit" disabled={loading} style={{ width: '100%', padding: '15px' }}>
          {loading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
       <div className="form-footer">
        <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></p>
      </div>
    </div>
  );
};

export default Register;