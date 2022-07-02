import React, {useRef, useImperativeHandle} from "react";

import classes from './Input.module.css'; 

const Input = React.forwardRef((props, ref) => { // this is the case if 'ref' should be set from outside. now it will allow ref in 'login.js' work.
    const inputRef = useRef();

    // we will call this function from outside so for that ref will not work. To make it work, use 'useImperativeHandler.
    const activate = () => {
        inputRef.current.focus();
    };

    useImperativeHandle(ref, () => {
        return { // should return object that contains all the data that we will be able to use from outside.
            focus: activate // translation obj b/w internal functionalities and outside world.
            // this is a field that point at the internal function or variable that should be accessible from outside.
        };
    });

    return (
        <div
          className={`${classes.control} ${props.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor={props.id}>{props.label}</label>
          <input
            ref={inputRef}
            type={props.type}
            id={props.id}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
          />
        </div>
    );
});

export default Input;