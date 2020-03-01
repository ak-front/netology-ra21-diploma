import axios, { CancelToken, isCancel } from 'axios';
import isFunction from 'lodash/isFunction';

import {
  FETCH_CATALOG_CATEGORIES_ERROR,
  FETCH_CATALOG_CATEGORIES_REQUEST,
  FETCH_CATALOG_CATEGORIES_SUCCESS,
  FETCH_CATALOG_ITEMS_ERROR,
  FETCH_CATALOG_ITEMS_REQUEST,
  FETCH_CATALOG_ITEMS_SUCCESS,
  SET_ITEMS,
  SET_MORE_BUTTON_VISIBILITY,
  SET_SEARCH_QUERY,
  SET_SELECTED_CATEGORY_ID
} from './../constants/actionTypes';
import { notifyError } from './../utils';

const {
  REACT_APP_API_CATALOG_CATEGORIES_URL,
  REACT_APP_API_CATALOG_ITEMS_URL
} = process.env;

let cancelFetchCatalogItems;

export const fetchCatalogCategoriesError = error => ({
  type: FETCH_CATALOG_CATEGORIES_ERROR,
  payload: {error}
});

export const fetchCatalogCategoriesRequest = () => ({
  type: FETCH_CATALOG_CATEGORIES_REQUEST
});

export const fetchCatalogCategoriesSuccess = categories => ({
  type: FETCH_CATALOG_CATEGORIES_SUCCESS,
  payload: {categories}
});

export const fetchCatalogCategories = () => async (dispatch, getState) => {
  dispatch(fetchCatalogCategoriesRequest());

  try {
    const response = await axios.get(REACT_APP_API_CATALOG_CATEGORIES_URL);

    dispatch(fetchCatalogCategoriesSuccess(response.data));
  } catch (error) {
    dispatch(fetchCatalogCategoriesError(error));
    notifyError(`При подгрузке категорий каталога произошла ошибка: ${error.message}`);

    return Promise.reject(error.message);
  }
};

export const fetchCatalogItemsError = (error, isItemsLoading = false) => ({
  type: FETCH_CATALOG_ITEMS_ERROR,
  payload: {error, isItemsLoading}
});

export const fetchCatalogItemsRequest = () => ({
  type: FETCH_CATALOG_ITEMS_REQUEST
});

export const fetchCatalogItemsSuccess = items => ({
  type: FETCH_CATALOG_ITEMS_SUCCESS,
  payload: {items}
});

let fetchCatalogItemsRequestCount = 0;
export const fetchCatalogItems = offset => async (dispatch, getState) => {
  if (isFunction(cancelFetchCatalogItems)) {
    cancelFetchCatalogItems();
  }

  fetchCatalogItemsRequestCount++
  dispatch(fetchCatalogItemsRequest());

  try {
    const {
      items,
      searchQuery,
      selectedCategoryId
    } = getState().catalog;

    const response = await axios.get(REACT_APP_API_CATALOG_ITEMS_URL, {
      cancelToken: new CancelToken(function executor(c) {
        cancelFetchCatalogItems = c;
      }),
      params: {
        categoryId: selectedCategoryId || null,
        offset: offset || null,
        q: searchQuery || null
      }
    });

    if (offset) {
      dispatch(fetchCatalogItemsSuccess([
        ...items,
        ...response.data
      ]));
    } else {
      dispatch(fetchCatalogItemsSuccess(response.data));
    }

    fetchCatalogItemsRequestCount--;
    dispatch(setMoreButtonVisibility(response.data.length >= 6));
  } catch (error) {
    fetchCatalogItemsRequestCount--;
    dispatch(fetchCatalogItemsError(error, fetchCatalogItemsRequestCount > 0));

    if (!isCancel(error)) {
      notifyError(`При подгрузке товаров каталога произошла ошибка: ${error.message}`);
    }

    return Promise.reject(error.message);
  }
};

export const setItems = (items = []) => ({
  type: SET_ITEMS,
  payload: {items}
});

export const setMoreButtonVisibility = isMoreButtonVisible => ({
  type: SET_MORE_BUTTON_VISIBILITY,
  payload: {isMoreButtonVisible}
});

export const setSearchQuery = searchQuery => ({
  type: SET_SEARCH_QUERY,
  payload: {searchQuery}
});

export const setSelectedCategoryId = selectedCategoryId => ({
  type: SET_SELECTED_CATEGORY_ID,
  payload: {selectedCategoryId}
});
