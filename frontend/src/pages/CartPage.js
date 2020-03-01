import React, { useContext } from 'react';

import CartContext from './../contexts/CartContext';

import Cart from './../components/Cart';
import OrderForm from './../components/OrderForm';

function CartPage() {
  const { products } = useContext(CartContext);

  return (products.length > 0 ? (
    <>
      <Cart />
      <OrderForm />
    </>
  ) : (
    <p className="h4 pt-5 mb-5 text-center">Корзина пуста</p>
  ));
}

export default CartPage;
