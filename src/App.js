import React from 'react';
import styled from 'styled-components';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Home from './Home';
import Vis1 from './vis/Vis1';
import Vis2 from './vis/Vis2';
import Vis3 from './vis/Vis3';
import Vis4 from './vis/Vis4';
import Vis5 from './vis/Vis5';
import Vis6 from './vis/Vis6';
import Vis7 from './vis/Vis7';
import Vis8 from './vis/Vis8';
import Vis9 from './vis/Vis9';
import Vis10 from './vis/Vis10';
import Vis11 from './vis/Vis11';
import MissingMigrants from './series/MissingMigrants';
import MissingMigrants1 from './vis/MissingMigrants/Vis1';
import MissingMigrants2 from './vis/MissingMigrants/Vis2';
import MissingMigrants3 from './vis/MissingMigrants/Vis3';
import Vis12 from './vis/Vis12';
import NuclearPower from './series/NuclearPower';
import NuclearPowerVis1 from './vis/NuclearPower/Vis1';
import NuclearPowerVis2 from './vis/NuclearPower/Vis2';
import NuclearPowerVis3 from './vis/NuclearPower/Vis3';
// import NuclearPowerVis4 from './vis/NuclearPower/Vis4';
import Vis13 from './vis/Vis13';

const HomeLink = styled(Link)`
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 100;
`;

const App = () => {
  document.getElementById('fcc_test_suite_wrapper').style.display = 'none';

  return (
    <>
      <HomeLink to='/'>Home</HomeLink>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/vis-1' element={<Vis1 />} />
        <Route path='/vis-2' element={<Vis2 />} />
        <Route path='/vis-3' element={<Vis3 />} />
        <Route path='/vis-4' element={<Vis4 />} />
        <Route path='/vis-5' element={<Vis5 />} />
        <Route path='/vis-6' element={<Vis6 />} />
        <Route path='/vis-7' element={<Vis7 />} />
        <Route path='/vis-8' element={<Vis8 />} />
        <Route path='/vis-9' element={<Vis9 />} />
        <Route path='/vis-10' element={<Vis10 />} />
        <Route path='/vis-11' element={<Vis11 />} />
        <Route path='/vis-12' element={<Vis12 />} />
        <Route path='/missing-migrants/' element={<MissingMigrants />} />
        <Route path='/missing-migrants/vis-1' element={<MissingMigrants1 />} />
        <Route path='/missing-migrants/vis-2' element={<MissingMigrants2 />} />
        <Route path='/missing-migrants/vis-3' element={<MissingMigrants3 />} />
        <Route path='/nuclear-power' element={<NuclearPower />} />
        <Route path='/nuclear-power/vis-1' element={<NuclearPowerVis1 />} />
        <Route path='/nuclear-power/vis-2' element={<NuclearPowerVis2 />} />
        <Route path='/nuclear-power/vis-3' element={<NuclearPowerVis3 />} />
        {/* <Route path='/nuclear-power/vis-4' element={<NuclearPowerVis4 />} /> */}
        <Route path='/vis-13' element={<Vis13 />} />
        <Route path='*' element={<Navigate replace to='/' />} />
      </Routes>
    </>
  );
};

export default App;
