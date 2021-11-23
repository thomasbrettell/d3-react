import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Vis1 from './vis/Vis1';
import Vis2 from './vis/Vis2';
import Vis3 from './vis/Vis3';
import Vis4 from './vis/Vis4';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/vis-1' element={<Vis1 />} />
      <Route path='/vis-2' element={<Vis2 />} />
      <Route path='/vis-3' element={<Vis3 />} />
      <Route path='/vis-4' element={<Vis4 />} />
    </Routes>
  );
};

export default App;
