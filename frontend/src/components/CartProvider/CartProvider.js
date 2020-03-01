import React from 'react';
import PropTypes from 'prop-types';

import CartContext from './../../contexts/CartContext';
import useStore from './../../hooks/useStore';

const STORE_KEY_PRODUCTS = 'cartProducts';

function CartProvider({ children }) {
  const [products, setProducts] = useStore(STORE_KEY_PRODUCTS, []);

  const addProduct = (id, title, price, size, count) => {
    let newProducts = [...products];

    if (newProducts.some(item => item.id === id && item.size === size)) {
      newProducts = newProducts.map(item => {
        if (item.id === id && item.size === size) {
          return {
            ...item,
            count: item.count + count
          };
        }

        return item;
      });
    } else {
      newProducts.push({
        id,
        title,
        price,
        size,
        count
      });
    }

    setProducts(newProducts);
  };

  const clearProducts = () => {
    setProducts(null);
  };

  const removeProduct = id => {
    const newProducts = products.filter(item => item.id !== id);

    setProducts(newProducts.length > 0 ? newProducts : null);
  };

  return (
    <CartContext.Provider value={{
      products,
      addProduct,
      clearProducts,
      removeProduct
    }}>
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node
};

export default CartProvider;