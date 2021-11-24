import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Vis1 from './vis/Vis1';
import Vis2 from './vis/Vis2';
import Vis3 from './vis/Vis3';
import Vis4 from './vis/Vis4';
import Vis5 from './vis/Vis5';
import Vis6 from './vis/Vis6';
import Vis7 from './vis/Vis7';
import Vis8 from './vis/Vis8';

const App = () => {
  document.getElementById('fcc_test_suite_wrapper').style.display = 'none';

  return (
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
    </Routes>
  );
};

export default App;
