import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';

import { submitOrder } from './../../redux/modules/order/actions';
import CartContext from './../../contexts/CartContext';
import { notifyError, notifySuccess } from './../../utils';

const isPhoneValid = phone => {
  return /\+7\s[0-9]{3}\s[0-9]{3}\s[0-9]{2}\s[0-9]{2}/.test(phone);
};

function OrderForm() {
  const { products, clearProducts } = useContext(CartContext);
  const [form, setForm] = useState({
    address: '',
    agreement: false,
    phone: ''
  });
  const { isSubmitting } = useSelector(state => state.order);
  const dispatch = useDispatch();
  const isValid = (
    products.length > 0
    && form.address !== ''
    && form.agreement
    && isPhoneValid(form.phone)
  );

  const handleChange = event => {
    const { target } = event;
    const { id, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;

    setForm(prevForm => ({
      ...prevForm,
      [id]: value
    }));
  };

  const handlePhoneChange = ({ formattedValue }) => {
    setForm(prevForm => ({
      ...prevForm,
      phone: formattedValue
    }));
  };

  const handleSubmit = event => {
    if (isValid) {
      dispatch(submitOrder(form.phone, form.address, products))
        .then(() => {
          clearProducts();
          notifySuccess('Поздравляем! Ваш заказ был успешно оформлен');
        })
        .catch(() => {
          notifyError('Произошла ошибка! Попробуйте ещё раз');
        });
    }

    event.preventDefault();
  };

  return (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      <div
        className="card"
        style={{
          maxWidth: '30rem',
          margin: '0 auto'
        }}>
        <form
          className="card-body"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <NumberFormat
              className="form-control"
              disabled={isSubmitting}
              format="+7 ### ### ## ##"
              id="phone"
              placeholder="Ваш телефон"
              value={form.phone}
              onValueChange={handlePhoneChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Адрес доставки</label>
            <input
              className="form-control"
              disabled={isSubmitting}
              id="address"
              placeholder="Адрес доставки"
              value={form.address}
              onChange={handleChange}
            />
          </div>
          <div className="form-group form-check">
            <input
              className="form-check-input"
              disabled={isSubmitting}
              id="agreement"
              type="checkbox"
              value={form.agreement}
              onChange={handleChange}
            />
            <label
              className="form-check-label"
              htmlFor="agreement"
            >
              Согласен с правилами доставки
            </label>
          </div>
          <button
            className="btn btn-outline-secondary"
            disabled={!isValid || isSubmitting}
            type="submit"
          >
            Оформить
          </button>
          {isSubmitting && (
            <div className="preloader d-inline-block align-middle my-0 ml-4">
              <span />
              <span />
              <span />
              <span />
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

OrderForm.propTypes = {

};

export default OrderForm;
