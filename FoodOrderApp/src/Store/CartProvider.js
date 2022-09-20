import { useReducer } from "react";
import CartContext from './CartContext';

const defaultCartState = {
    items : [],
    totalAmount :0,
}

//CartProvider.js class for writting logic for CartContext  & fwd that logic to every component

const cartReducer = (state , action) =>{
    if (action.type === 'Add_Cart_Item') {
        const updatedTotalAmount =
          state.totalAmount + action.item.price * action.item.amount;
    
        const existingCartItemIndex = state.items.findIndex(
          (item) => item.id === action.item.id
        );
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;
    
        if (existingCartItem) {
          const updatedItem = {
            ...existingCartItem,
            amount: existingCartItem.amount + action.item.amount,
          };
          updatedItems = [...state.items];
          updatedItems[existingCartItemIndex] = updatedItem;
        } else {
          updatedItems = state.items.concat(action.item);
        }
    
        return {
          items: updatedItems,
          totalAmount: updatedTotalAmount,
        };
      }

      
      if (action.type === 'Remove_Cart_Item') {
        const existingCartItemIndex = state.items.findIndex(
          (item) => item.id === action.id
        );
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if (existingItem.amount === 1) {
          updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
          const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
          updatedItems = [...state.items];
          updatedItems[existingCartItemIndex] = updatedItem;
        }
    
        return {
          items: updatedItems,
          totalAmount: updatedTotalAmount
        };
      }

      if(action.type === 'CLEAR'){
        return defaultCartState;
      }
    
      return defaultCartState;
    };


const CartProvider = (props) => {

    const [cartState , dispatchCartAction] = useReducer(cartReducer , defaultCartState);

    const addItemtoCartHandler =(item) =>{
        dispatchCartAction({type: 'Add_Cart_Item', item : item});
    }

    const removeItemfromCartHandler = (id) =>{
        dispatchCartAction({type :'Remove_Cart_Item', id: id});
    }

    const clearCartHandler = () =>{
      dispatchCartAction({type : 'CLEAR'});
    }

    const cartContext = {
    items : cartState.items,
    totalAmount :cartState.totalAmount,
    addItem : addItemtoCartHandler,
    removeItem : removeItemfromCartHandler,
    clearCart : clearCartHandler
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )

}
export default CartProvider