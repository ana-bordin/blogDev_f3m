import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

var displayName = null
if (sessionStorage.getItem("userName") != null) {
  displayName = sessionStorage.getItem("userName")
}

const Navbar = () => {
  return (
    <>
      <nav className={styles.navbar}>
        <NavLink to='/' className={styles.brand}>
          Blog <span>Dev</span>
        </NavLink>
        <ul className={styles.links_list}>
          {displayName != null && <li> Bem vindo {displayName}</li>}
          <li>
            <NavLink to='/'
              className={({ isActive }) => (isActive ? styles.active : null)}>Home</NavLink>
          </li>
          {displayName == null  &&
          <li>
            <NavLink to='/login'
              className={({ isActive }) => (isActive ? styles.active : null)}>Login</NavLink>
          </li>}
          {displayName != null  &&
          <li>
            <NavLink to='/logout'
              className={({ isActive }) => (isActive ? styles.active : null)}>LogOut</NavLink>
          </li>}
          {displayName == null && <li>
            <NavLink to='/register'
              className={({ isActive }) => (isActive ? styles.active : null)}>Register</NavLink>
          </li>}
          <li>
            <NavLink to='/about'
              className={({ isActive }) => (isActive ? styles.active : null)}>About</NavLink>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar