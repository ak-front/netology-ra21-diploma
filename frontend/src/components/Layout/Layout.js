import React from 'react';
import PropTypes from 'prop-types';

import Header from './../Header';

function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="container">
        <div className="row">
          <div className="col">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
