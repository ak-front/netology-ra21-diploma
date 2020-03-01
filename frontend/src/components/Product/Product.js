import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter, useHistory } from 'react-router-dom';
import axios from 'axios';

import LINKS from './../../constants/links';
import CartContext from './../../contexts/CartContext';

import Preloader from './../Preloader';
import ProductCount from './ProductCount';
import ProductSizes from './ProductSizes';

const { REACT_APP_API_CATALOG_ITEMS_URL } = process.env;
const CancelToken = axios.CancelToken;

function Product({ match }) {
  const { addProduct: addProductToCart } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const history = useHistory();
  const { id } = match.params;

  const handleAddClick = event => {
    const { price, title } = product;

    addProductToCart(parseInt(id), title, price, selectedSize, count);
    history.push(LINKS.CART);
    event.preventDefault();
  };

  const handleCountChange = count => {
    setCount(count);
  };

  const handleSizesItemClick = size => {
    setSelectedSize(size);
  };

  useEffect(() => {
    let cancelFetchProduct;
    let isSubscribed = true;
    const fetchProduct = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(`${REACT_APP_API_CATALOG_ITEMS_URL}/${id}`, {
          cancelToken: new CancelToken(function executor(c) {
            cancelFetchProduct = c;
          })
        });

        setProduct(response.data);
      } catch (error) {} finally {
        if (isSubscribed) {
          setIsLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      cancelFetchProduct();
      isSubscribed = false;
    };
  }, []);

  if (product === null && !isLoading) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="py-5">
        <Preloader />
      </div>
    );
  }

  const availableSizes = product.sizes.filter(size => size.avalible);

  return (
    <section className="catalog-item">
      <h2 className="text-center">{product.title}</h2>
      <div className="row">
        <div className="col-5">
          <img
            className="img-fluid"
            src={product.images[0]}
            alt=""
          />
        </div>
        <div className="col-7">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Артикул</td>
                <td>{product.sku}</td>
              </tr>
              <tr>
                <td>Производитель</td>
                <td>{product.manufacturer}</td>
              </tr>
              <tr>
                <td>Цвет</td>
                <td>{product.color}</td>
              </tr>
              <tr>
                <td>Материалы</td>
                <td>{product.material}</td>
              </tr>
              <tr>
                <td>Сезон</td>
                <td>{product.season}</td>
              </tr>
              <tr>
                <td>Повод</td>
                <td>{product.reason}</td>
              </tr>
            </tbody>
          </table>
          {availableSizes.length > 0 && (
            <>
              <div className="text-center">
                <ProductSizes
                  items={availableSizes}
                  selectedSize={selectedSize}
                  onItemClick={handleSizesItemClick}
                />
                <ProductCount
                  count={count}
                  onChange={handleCountChange}
                />
              </div>
              <button
                className="btn btn-danger btn-block btn-lg"
                disabled={selectedSize === ''}
                onClick={handleAddClick}
              >
                В корзину
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

Product.propTypes = {
  match: PropTypes.object.isRequired
};

export default withRouter(Product);
