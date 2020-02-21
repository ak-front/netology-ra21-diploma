import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import {
  ABOUT_PAGE,
  CATALOG_PAGE,
  CONTACT_PAGE,
  ERROR_PAGE,
  HOME_PAGE
} from './constants/routes';

import AboutPage from './pages/AboutPage';
import CatalogPage from './pages/CatalogPage';
import ContactsPage from './pages/ContactsPage';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';

import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route
            component={AboutPage}
            exact
            path={ABOUT_PAGE}
          />
          <Route
            component={CatalogPage}
            exact
            path={CATALOG_PAGE}
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
