import React from 'react';
import PropTypes from 'prop-types';

import Banner from './../Banner';
import Header from './../Header';

function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner
              image="/img/banner.jpg"
              title="К весне готовы!"
            />
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
