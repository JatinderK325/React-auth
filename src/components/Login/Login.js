import React, { useState, useEffect, useReducer } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

// Note: We create reducer function outside of the component function becoz inside this reducer function, we won't need any data that is generated here inside the component function. Hence, this reducer function can be created outside of the component function becoz it does not need to interact with anything that is defined inside the componet function. All the data defined in the reducer function will be passed automatically by the react when it is executed.
const emailReducer = (state, action) => {
  // here we are updating both 'value' and 'validity' when we receive user input action
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  }

  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') };
  }

  return { value: '', isValid: false };
};

// for password
const passwordReducer = (state, action) => {
  // here we are updating both 'password' and 'validity' when we receive user input action
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }

  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6};
  }

  return { value: '', isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // lets grab 'enteredEmail' and 'emailIsValid' together using useReducer() hook.
  const [emailState, dispatchEmail] = useReducer(emailReducer,
    {
      value: '',
      isValid: null
    });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null
  });  

  // to avoid unneccsary effect execution: means when the inputs are valid, the use effect code should not run again. mtlb useeffect() run houga jdo v state update hougi, bt apa enu odo stop krna chaune aa jdo sadian inputs valid ho jaan. for eg: jd email enter hogi and password enter hogea 'useEffect()' te 'cleanup()' run krnge te console ch show hou pr jdo password 7 digit tk valid ho janda ae te apa 8 digit, 9 or more than 9 digits enter krage te 'useEffect()' stop hoju , we can see console othe show nai hou meassage console.log('Checking form validity'); and console.log('Cleanup');.
  const {isValid: emailIsValid} = emailState; // here we are pulling out 'isValid' property and storing it in a constant named 'emailIsValid'.
  const {isValid: passwordIsValid} = passwordState;

  // used sideEffect to check form validity in response to email and password fields with the help of useEffect hook:
  useEffect(() => {
    const handler = setTimeout(() => {
      console.log('Checking form validity');
      // this will run only once for every keystroke. this part will run for the first time. then cleanup function will run only. Note: but after that, before every new side effect function execution, cleanup function will run.
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 500);

    return () => {
      // cleanup function with in built clearTimeout function to clear the timer.
      console.log('Cleanup');
      clearTimeout(handler);
    };
  }, [setFormIsValid, emailIsValid, passwordIsValid])
  

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    // use dispatchEmail to dispatch an action - when we want to update email's value.
    // passes action: which is a object.
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
    // type describes what happens.
    // extra payload which is a value entered by user.
    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type: 'USER_INPUT', val: event.target.value});
    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    // use dispatchEmail to dispatch an action - when we want to update email's validity.
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type: 'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
