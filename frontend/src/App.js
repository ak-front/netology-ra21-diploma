import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import {
  ABOUT_PAGE,
  CONTACT_PAGE,
  ERROR_PAGE
} from './constants/routes';

import About from './pages/About';
import Contacts from './pages/Contacts';
import Error404 from './pages/Error404';

import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route
            component={About}
            exact
            path={ABOUT_PAGE}
          />
          <Route
            component={Contacts}
            exact
            path={CONTACT_PAGE}
          />
          <Route
            component={Error404}
            path={ERROR_PAGE}
          />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
