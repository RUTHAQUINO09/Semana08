import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = ({ currentUser, onLogout }) => {
  const isModerator = currentUser?.roles.includes('ROLE_MODERATOR');
  const isAdmin = currentUser?.roles.includes('ROLE_ADMIN');

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.brand}>
          AuthApp
        </Link>

        <ul className={styles.navMenu}>
          {currentUser && (
            <>
              <li className={styles.navItem}>
                <NavLink to="/dashboard" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>
                  Dashboard
                </NavLink>
              </li>
              {isModerator && (
                <li className={styles.navItem}>
                  <NavLink to="/mod" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>
                    Moderación
                  </NavLink>
                </li>
              )}
              {isAdmin && (
                <li className={styles.navItem}>
                  <NavLink to="/admin" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>
                    Panel Admin
                  </NavLink>
                </li>
              )}
            </>
          )}
        </ul>

        <ul className={styles.navMenu}>
          {currentUser ? (
            <>
              <li className={styles.navItem}>
                <NavLink to="/profile" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>
                  {currentUser.username}
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <button onClick={onLogout} className={styles.logoutButton}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className={styles.navItem}>
                <NavLink to="/login" className={({ isActive }) => isActive ? styles.activeLink : styles.navLink}>
                  Login
                </NavLink>
              </li>
              <li className={styles.navItem}>
                <NavLink to="/register" className={`${styles.navLink} ${styles.registerButton}`}>
                  Registrarse
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;