import React from 'react';
import * as AuthService from '../utils/auth';
import styles from './Profile.module.css';

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  if (!currentUser) {
    return (
      <div className={styles.profileCard}>
        <h1>Perfil</h1>
        <p>No se pudo cargar la información del usuario.</p>
      </div>
    );
  }

  return (
    <div className={styles.profileCard}>
      <h1>Perfil de Usuario</h1>
      <div className={styles.infoGroup}>
        <span className={styles.label}>ID de Usuario:</span>
        <span className={styles.value}>{currentUser.id}</span>
      </div>
      <div className={styles.infoGroup}>
        <span className={styles.label}>Nombre de Usuario:</span>
        <span className={styles.value}>{currentUser.username}</span>
      </div>
      <div className={styles.infoGroup}>
        <span className={styles.label}>Email:</span>
        <span className={styles.value}>{currentUser.email}</span>
      </div>
      <div className={styles.infoGroup}>
        <span className={styles.label}>Roles:</span>
        <div className={styles.rolesContainer}>
          {currentUser.roles && currentUser.roles.map((role, index) => (
            <span key={index} className={styles.roleTag}>
              {role.replace('ROLE_', '')}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;

// Crear también el archivo CSS Module para Profile
// file: src/pages/Profile.module.css