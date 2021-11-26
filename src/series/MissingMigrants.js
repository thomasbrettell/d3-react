import React from 'react';
import NavLink from '../components/NavLink';

const MissingMigrants = () => {
  return (
    <nav>
      <ul>
        <NavLink
          link='/missing-migrants/vis-1'
          text='Vis 1 - Dead or Missing Migrants 2014-2022'
        />
      </ul>
    </nav>
  );
};

export default MissingMigrants;
