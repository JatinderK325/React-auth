import React, {useState, useEffect} from "react";

// here AuthContext creates such a context object.
// createContext takes a default context(the app-wide or component-wide).
// this state can be string, text or object (in our case here).
// AuthContext is itself a object not a component that contains a component.
// for using context, we need to do two things: 1. we need to provide it - to tell react its my context.
// 2. we need to consume it - call, hook into it, listen to it.
// we need this context everywhere in the entire application(in all components) therefore we will have to wrap everything in a <app> component with it. */}
    
const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => { },
    onLogin: (email, password) => { }
});


// AuthContextProvider is a component for state management and context management.
export const AuthContextProvider = (props) => {
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
    
    // here AuthContext is an object and we wrap our JSX code with component only so on this object, we can access property named 'Provider' which is a component.
    return <AuthContext.Provider value ={
        {
          isLoggedIn: isLoggedIn,
          onLogout: logoutHandler,
          onLogin: loginHandler
        }
      }>
        {/* now all these components and their children have access to this context. */}
        {props.children}
    </AuthContext.Provider>;
}

export default AuthContext;