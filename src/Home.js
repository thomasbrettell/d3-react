import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/vis-1'>Vis 1 - Face</Link>
        </li>
        <li>
          <Link to='/vis-2'>Vis 2 - CSS Colours</Link>
        </li>
        <li>
          <Link to='/vis-3'>Vis 3 - UN Population 2020 Bar Chart</Link>
        </li>
        <li>
          <Link to='/vis-4'>Vis 4 - Iris Flower Scatter Plot</Link>
        </li>
        <li>
          <Link to='/vis-5'>Vis 5 - Temperature Line Graph</Link>
        </li>
        <li>
          <Link to='/vis-6'>Vis 6 - Geojson</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Home;
