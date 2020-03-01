import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import LINKS from './../../constants/links';
import CartContext from './../../contexts/CartContext';

function HeaderCartControl() {
  const { products } = useContext(CartContext);
  const history = useHistory();

  const handleClick = () => {
    if (products.length > 0) {
      history.push(LINKS.CART);
    }
  };

  return (
    <div
      className="header-controls-pic header-controls-cart"
      onClick={handleClick}
    >
      {products.length > 0 && (
        <div className="header-controls-cart-full">{products.length}</div>
      )}
      <div className="header-controls-cart-menu"></div>
    </div>
  );
}

export default HeaderCartControl;
