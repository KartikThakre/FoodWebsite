import React from 'react';

//common store for provideing data to each component
const CartContext = React.createContext ({
    items : [],
    totalAmount :0,
    addItem :(item)=>{},
    removeItem : (id)=>{},
    clearCart : () => {}


});
export default CartContext;