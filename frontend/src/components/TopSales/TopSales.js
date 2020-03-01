import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTopSales } from './../../actions/topSales';
import Preloader from './../Preloader';
import ProductCard from './../ProductCard';

function TopSales() {
  const { items, isLoading } = useSelector(state => state.topSales);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTopSales());
  }, [dispatch]);

  if (items.length === 0 && !isLoading) {
    return null;
  }

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {isLoading ? (
        <Preloader />
      ) : (
        <div className="row">
          {items.map(item => (
            <div
              className="col-4"
              key={item.id}
            >
              <ProductCard
                id={item.id}
                images={item.images}
                price={item.price}
                title={item.title}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default TopSales;
