import { useContext, useEffect, useState } from 'react';
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../Store/CartContext";
import classes from "./HeaderCartButton.module.css"

const HeaderCartButton = (props) =>{

    const [btnHighlated, setBtnHighlated] = useState (false);

    const cartCtx = useContext(CartContext);

    const {items} = cartCtx;
    // this fuction helps to add no of amount in ur CartButton by useing reduce() method
    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
      },0);

    const btnClasses = `${classes.button} ${ btnHighlated ? classes.bump : ''}`;
    
    useEffect(() => {
        if(items.length === 0){
            return;
        }
        setBtnHighlated(true);

        const timer = setTimeout(() =>{
            setBtnHighlated(false)
        }, 300);

        return () =>{
            clearTimeout(timer);
        };
        
    } , [items]);
    // span can be used to group elements for styling purposes
return(
<button className = {btnClasses} onClick={props.onShowCart}>
        <span className = {classes.icon}><CartIcon/></span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
</button>
    );

};
    export default HeaderCartButton;
