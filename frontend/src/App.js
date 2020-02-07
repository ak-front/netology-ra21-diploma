import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import About from './pages/About';
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
            path="/about"
          />
          <Route
            component={Error404}
            path="*"
          />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
