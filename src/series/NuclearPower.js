import React from 'react';
import NavLink from '../components/NavLink';

const NuclearPower = () => {
  return (
    <nav>
      <ul>
        <NavLink
          link='/nuclear-power/vis-1'
          text='Vis 1 - International opposition to the production of nuclear energy'
        />
        <NavLink
          link='/nuclear-power/vis-2'
          text='Vis 2'
        />
      </ul>
    </nav>
  );
};

export default NuclearPower;
