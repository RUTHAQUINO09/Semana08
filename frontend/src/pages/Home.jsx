import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.hero}>
      <div className={`${styles.card} ${styles.levitating}`}>
        <h1 className={styles.title}>Bienvenida a tu Espacio Seguro</h1>
        <p className={styles.subtitle}>
          Autenticación moderna y elegante implementada con React y Node.js.
        </p>
        <div className={styles.ctaContainer}>
          <Link to="/register" className={styles.ctaButton}>
            Comienza Ahora
          </Link>
          <Link to="/login" className={`${styles.ctaButton} ${styles.secondary}`}>
            Ya tengo cuenta
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

// Crear también el archivo CSS Module para Home
// file: src/pages/Home.module.css