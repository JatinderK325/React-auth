import React, { useState, useEffect } from 'react';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth_context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // to check the stored user's information:
  useEffect(() => {
    const storedUserLoggedInInfo = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInfo === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    // <React.Fragment>
    // we need this context everywhere in the entire application(in all components) therefore we will have to wrap everything in a <app> component with it.
    // here AuthContext is an object and we wrap our JSX code with component only so on this object, we can access property named 'Provider' which is a component.
    <AuthContext.Provider value ={
      {
        isLoggedIn: isLoggedIn,
      }
    }>
      {/* now all these components and their children have access to this context. */}
      <MainHeader onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
    // </React.Fragment>
  );
}

export default App;
