import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import ReactNotification from 'react-notifications-component'

import {
  ABOUT_PAGE,
  CART_PAGE,
  CATALOG_PAGE,
  CONTACT_PAGE,
  ERROR_PAGE,
  HOME_PAGE,
  PRODUCT_PAGE
} from './constants/routes';

import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import CatalogPage from './pages/CatalogPage';
import ContactsPage from './pages/ContactsPage';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

import Layout from './components/Layout';

import 'animate.css/animate.css';
import 'react-notifications-component/dist/theme.css';

function App() {
  return (
    <Router>
      <ReactNotification />
      <Layout>
        <Switch>
          <Route
            component={AboutPage}
            exact
            path={ABOUT_PAGE}
          />
          <Route
            component={CartPage}
            exact
            path={CART_PAGE}
          />
          <Route
            component={CatalogPage}
            exact
            path={CATALOG_PAGE}
          />
          <Route
            component={ProductPage}
            exact
            path={PRODUCT_PAGE}
          />
          <Route
            component={ContactsPage}
            exact
            path={CONTACT_PAGE}
          />
          <Route
            component={HomePage}
            exact
            path={HOME_PAGE}
          />
          <Route
            component={ErrorPage}
            path={ERROR_PAGE}
          />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
