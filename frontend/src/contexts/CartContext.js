import { createContext } from 'react';

const CartContext = createContext({
  products: []
});

export default CartContext;
