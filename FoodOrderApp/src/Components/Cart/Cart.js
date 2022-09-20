import { useContext, useState } from 'react';
import CartContext from '../../Store/CartContext';
import Modal from '../Cart/Modal';
import classes from './Cart.module.css'
import CartItem from './CartItem'
import Checkout from './Checkout';

const Cart = (props)=>{

    const [isCheckout , setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit , setDidSubmit] = useState(false);

    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const hasItems = cartCtx.items.length > 0;

    const cartAddHAndler = (item) => {
        cartCtx.addItem({...item,amount:1});

    }

    const cartRemoveHandler = (id) => {
        cartCtx.removeItem(id);

    }

    const orderHandler = () =>{
        setIsCheckout(true);
    }

    const submitOrderHandler = async (userdata) =>{
    setIsSubmitting(true);
       await fetch('https://meals-data-cd85a-default-rtdb.firebaseio.com/orders.json',{
            method : 'POST',
            body :JSON.stringify({
               user: userdata,
               orderedItems : cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();

    }

    const cartItems = (
        <ul className = {classes['cart-items']}>
        {cartCtx.items.map((item) => (
            <CartItem key={item.id} name={item.name} 
            amount={item.amount} 
            price={item.price} 
            onAdd={cartAddHAndler.bind(null , item)} 
            onRemove={cartRemoveHandler.bind(null ,item.id)}/>
        ))}
        </ul>);

     const modelActions = (
        <div className ={classes.actions}>
         <button className ={ classes['button--alt']} onClick={props.onCloseCart}>Close</button>
        {hasItems && ( <button className = {classes.button} onClick= {orderHandler}>Order</button>)}
        </div>
     );   

     const cartModelContent = (
         <>
        {cartItems}
        <div className = {classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onCloseCart} />}
        {!isCheckout && modelActions }
         </>
     );

     const isSubmittingModelContent = <p>Sending user Data...</p>;
     const didSubmitModelContent = (    
     <>
     <p>Successfully Placed your Order...</p>
     <div className ={classes.actions}>
         <button className ={ classes.button} onClick={props.onCloseCart}>Close</button>
         </div>
     </>
     );
        return (
            <Modal onClick = {props.onCloseCart}>
                {!isSubmitting && !didSubmit && cartModelContent}
                {isSubmitting && isSubmittingModelContent}
                {!isSubmitting && didSubmit && didSubmitModelContent}
                
            </Modal>

        )

}
export default Cart;