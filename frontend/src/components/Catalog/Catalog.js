import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchCatalogCategories,
  fetchCatalogItems
} from './../../actions/catalog';
import CatalogCategories from './CatalogCategories';
import ProductCard from './../ProductCard';

// TODO: loading
function Catalog() {
  const {
    categories,
    isItemsLoading,
    isMoreButtonVisible,
    items,
    selectedCategoryId
  } = useSelector(state => state.catalog);
  const dispatch = useDispatch();

  const handleMoreButtonClick = event => {
    if (!isItemsLoading) {
      dispatch(fetchCatalogItems(items.length));
    }

    event.preventDefault();
  }

  useEffect(() => {
    dispatch(fetchCatalogCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCatalogItems());
  }, [dispatch, selectedCategoryId]);

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      <CatalogCategories
        items={[
          {
            id: 0,
            title: 'Все'
          },
          ...categories
        ]}
        selectedCategoryId={selectedCategoryId}
      />
      {items.length > 0 && (
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
      {isMoreButtonVisible && (
        <div className="text-center">
          <button
            className="btn btn-outline-primary"
            disabled={isItemsLoading}
            onClick={handleMoreButtonClick}
          >
            Загрузить ещё
          </button>
        </div>
      )}
    </section>
  );
}

export default Catalog;
