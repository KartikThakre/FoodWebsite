import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css'
import { useContext } from 'react';
import CartContext from '../../../Store/CartContext';


const MealItem = (props) =>{

    //like cartCtx we can get that context store value in any component
    const cartCtx = useContext(CartContext);

    //here 1st $ sign is use for outputting the value as a doller and 2 nd one use for displaying the values in 2 digitno
    const price = `$${props.price.toFixed(2)}`;

    const addToCartHandler = amount => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price : props.price
        })

    }

    return(
        <li className ={classes.meal}>
        <div>
            <h3>{props.name}</h3>
            <div className={classes.description}>
                {props.description}
            </div> 
            <div className={classes.price}>{price}</div>
       </div>
       <div>
           <MealItemForm onAddToCart={addToCartHandler} />
       </div>
        </li>
    )
}
export default MealItem;