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
          text='Vis 2 - International energy consumption from different energy sources'
        />
        <NavLink
          link='/nuclear-power/vis-3'
          text='Vis 3 - Comparing C02 emissions, deaths and global share of energy for different sources of energy'
        />
        {/* <NavLink
          link='/nuclear-power/vis-4'
          text='Vis 4'
        /> */}
      </ul>
    </nav>
  );
};

export default NuclearPower;
