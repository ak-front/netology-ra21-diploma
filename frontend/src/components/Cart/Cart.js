import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import LINKS from './../../constants/links';
import CartContext from './../../contexts/CartContext';
import { formatPrice } from './../../utils';

function Cart() {
  const { products, removeProduct } = useContext(CartContext);
  const { isSubmitting } = useSelector(state => state.order);

  const handleRemoveClick = id => {
    if (!isSubmitting) {
      removeProduct(id);
    }
  };

  const getTotalAmount = () => {
    return products.reduce((amount, item) => amount + item.price * item.count, 0);
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="cart">
      <h2 className="text-center">Корзина</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Название</th>
            <th scope="col">Размер</th>
            <th scope="col">Кол-во</th>
            <th scope="col">Стоимость</th>
            <th scope="col">Итого</th>
            <th scope="col">Действия</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={`${item.id}-${item.size}`}>
              <th scope="row">{index + 1}</th>
              <td>
                <Link to={`${LINKS.CATALOG}/${item.id}`}>{item.title}</Link>
              </td>
              <td>{item.size}</td>
              <td>{item.count}</td>
              <td>{formatPrice(item.price)} руб.</td>
              <td>{formatPrice(item.price * item.count)} руб.</td>
              <td>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleRemoveClick(item.id)}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="5" className="text-right">Общая стоимость</td>
            <td>{formatPrice(getTotalAmount())} руб.</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export default Cart;
