import React from 'react';
import Navigation from './Navigation';
import classes from './MainHeader.module.css';

const MainHeader = (props) => {
  return (
    <header className={classes['main-header']}>
      <h1>A Typical Page</h1>
      {/* isLoggedIn = {props.isAuthenticated} and onLogout={props.onLogout} has been removed from line 10*/} 
      <Navigation  /> 
    </header>
  );
};

export default MainHeader;
