import axios from 'axios';
import isFunction from 'lodash/isFunction';

import {
  FETCH_CATALOG_CATEGORIES_ERROR,
  FETCH_CATALOG_CATEGORIES_REQUEST,
  FETCH_CATALOG_CATEGORIES_SUCCESS,
  FETCH_CATALOG_ITEMS_ERROR,
  FETCH_CATALOG_ITEMS_REQUEST,
  FETCH_CATALOG_ITEMS_SUCCESS,
  SET_MORE_BUTTON_VISIBILITY,
  SET_SEARCH_QUERY,
  SET_SELECTED_CATEGORY_ID
} from './../constants/actionTypes';

const {
  REACT_APP_API_CATALOG_CATEGORIES_URL,
  REACT_APP_API_CATALOG_ITEMS_URL
} = process.env;

const CancelToken = axios.CancelToken;
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
  }
};

export const fetchCatalogItemsError = error => ({
  type: FETCH_CATALOG_ITEMS_ERROR,
  payload: {error}
});

export const fetchCatalogItemsRequest = () => ({
  type: FETCH_CATALOG_ITEMS_REQUEST
});

export const fetchCatalogItemsSuccess = items => ({
  type: FETCH_CATALOG_ITEMS_SUCCESS,
  payload: {items}
});

export const fetchCatalogItems = offset => async (dispatch, getState) => {
  dispatch(fetchCatalogItemsRequest());

  try {
    const {
      items,
      searchQuery,
      selectedCategoryId
    } = getState().catalog;

    if (isFunction(cancelFetchCatalogItems)) {
      cancelFetchCatalogItems();
    }

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

    dispatch(setMoreButtonVisibility(response.data.length >= 6));
  } catch (error) {
    dispatch(fetchCatalogItemsError(error));
  }
};

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
