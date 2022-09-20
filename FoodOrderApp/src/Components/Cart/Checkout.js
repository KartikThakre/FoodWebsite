import { useRef, useState } from 'react';
import classes from './Checkout.module.css';


const isEmpty = value => value.trim() === '';
const isFiveChar = value => value.trim().length === 6 ;

const Checkout = (props) =>{

    const [formValidity, setFormValidity] =  useState({
        name : true,
        street :true,
        postalcode : true,
        city : true
    })

    const nameInputRef =  useRef();
    const streetInputRef =  useRef();
    const postalInputRef =  useRef();
    const cityInputRef =  useRef();

    const confirmHandler = (event) =>{
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;


        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostalIsValid = isFiveChar(enteredPostal);
        const enteredCityIsValid = !isEmpty(enteredCity);

        setFormValidity({
            name : enteredNameIsValid,
            street : enteredStreetIsValid,
            postalcode : enteredPostalIsValid,
            city : enteredCityIsValid
        })


        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalIsValid && enteredCityIsValid

        if(!formIsValid){
            return;
        }

        props.onConfirm({
            name : enteredName,
            street : enteredStreet,
            postalcode: enteredPostal,
            city : enteredCity
        })
    }

        const nameControlclasses = `${classes.control} ${formValidity.name ? '' : classes.invalid}`;
        const streetControlclasses = `${classes.control} ${formValidity.street ? '' : classes.invalid}`;
        const postalControlclasses = `${classes.control} ${formValidity.postalcode ? '' : classes.invalid}`;
        const cityControlclasses = `${classes.control} ${formValidity.city? '' : classes.invalid}`;

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
          <div className={nameControlclasses}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' id='name' ref={nameInputRef} />
            {!formValidity.name && <p>Please enter a valid name...</p>}
          </div>
          <div className={streetControlclasses}>
            <label htmlFor='street'>Street</label>
            <input type='text' id='street' ref={streetInputRef} />
            {!formValidity.street && <p>Please enter a valid Street name...</p>}
          </div>
          <div className={postalControlclasses}>
            <label htmlFor='postal'>Postal Code</label>
            <input type='text' id='postal'  ref ={postalInputRef}/>
            {!formValidity.postalcode && <p>Please enter a valid PostalCode..(6 character long)</p>}
          </div>
          <div className={cityControlclasses}>
            <label htmlFor='city'>City</label>
            <input type='text' id='city'  ref={cityInputRef}/>
            {!formValidity.city && <p>Please enter a valid City...</p>}
          </div>
          <div className={classes.actions}>
            <button type='button' onClick={props.onCancel}>
              Cancel
            </button>
            <button className={classes.submit}>Confirm</button>
          </div>
        </form>
      );
}
export default Checkout;