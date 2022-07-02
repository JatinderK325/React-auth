import React, { useContext } from 'react';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth_context';

function App() {
  /* const [isLoggedIn, setIsLoggedIn] = useState(false);

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
  */

  // for the above commented code we have made a seperate component(file) 'AuthContext'.

  const ctx = useContext(AuthContext);

  return (
    <React.Fragment>
      {/* isAuthenticated = {isLoggedIn} and onLogout={logoutHandler}has been removed from line 36 */}
      <MainHeader />
      <main>
        {/* for Login and Home components, we will use props like before not context becoz Login and Home components are using data not forwarding data. */}
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
}

export default App;
