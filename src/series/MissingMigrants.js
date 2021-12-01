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
        <NavLink
          link='/missing-migrants/vis-2'
          text='Vis 2 - Dead or Missing Migrants Mapped Geographically (Brush)'
        />
        <NavLink link='/missing-migrants/vis-3' text='Vis 3 - Log Scale' />
      </ul>
    </nav>
  );
};

export default MissingMigrants;
