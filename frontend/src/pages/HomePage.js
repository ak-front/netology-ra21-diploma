import React from 'react';

import Catalog from './../components/Catalog';
import TopSales from './../components/TopSales';

function HomePage() {
  return (
    <div>
      <TopSales />
      <Catalog />
    </div>
  );
}

export default HomePage;
