import classes from './MealItemForm.module.css'
import Input from '../../UI/Input';
import { useRef, useState } from 'react';

const MealItemForm = (props) =>{

    const [amountIsVAlid , setAmountIsValid] = useState(true);

    const amountInputRef = useRef();

    const submitHandlerForm = (event) => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5){
            setAmountIsValid(false)
            return;
        }

        props.onAddToCart(enteredAmountNumber);
    }
return (
    <form className = {classes.form} onSubmit={submitHandlerForm}>
    <Input 
    ref = {amountInputRef}
    label = 'Amount'
    input ={{
        id:'amount' + props.id,
        type:'number',
        min:'1',
        max:'5',
        step:'1',
        defaultValue : '1'
    }}/>
    <button>+ Add</button>
    {!amountIsVAlid &&  <p>Please enter a valid Amount (1-5) </p>}

</form>
);
}
export default MealItemForm;