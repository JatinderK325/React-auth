import React, { useContext } from 'react';
import AuthContext from '../../store/auth_context';
import classes from './Navigation.module.css';

// use either context consumer or useContext hook to listen context. through this we have passes isLoggedIn state here without using props.so we can remove props from Navigation component
// const Navigation = (props) => {
const Navigation = () => {
  const ctx = useContext(AuthContext);
  return (
    // <AuthContext.Consumer>
    // {(ctx) => {
    // return ( 
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && ( // instead of props.isLoggedIn
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={ctx.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
    // );
    // }}
    // </AuthContext.Consumer>
  );
};

export default Navigation;
