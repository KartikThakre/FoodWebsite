import classes from './Input.module.css'
import React from 'react';

//for useing ref inside the custom component we hav to fwd it by forward.Ref() like below fuction
//conside all ref if u wann look in future...e.g how it works and how to use it... 
const Input = React.forwardRef((props , ref) => {
    // htmlFor : That means that this script-accessible property is used to set and read the value of the content property for 
    return (
        <div className = {classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={ref} {...props.input} />

        </div>
    )

});
export default Input