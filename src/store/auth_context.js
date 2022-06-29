import React from "react";

// here AuthContext creates such a context object.
// createContext takes a default context(the app-wide or component-wide).
// this state can be string, text or object (in our case here).
// AuthContext is itself a object not a component that contains a component.
// for using context, we need to do two things: 1. we need to provide it - to tell react its my context.
// 2. we need to consume it - call, hook into it, listen to it.
const AuthContext = React.createContext({
    isLoggedIn: false
});

export default AuthContext;