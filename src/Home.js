import React from 'react';
import NavLink from './components/NavLink';

//PLEASE DONT FORMAT
const Home = () => {
  return (
    <nav>
      <ul>
        <NavLink link='/vis-1' text='Vis 1 - Face' />
        <NavLink link='/vis-2' text='Vis 2 - CSS Colours' />
        <NavLink link='/vis-3' text='Vis 3 - UN Population 2020 Bar Chart' />
        <NavLink link='/vis-4' text='Vis 4 - Iris Flower Scatterplot' />
        <NavLink link='/vis-5' text='Vis 5 - Temperature Line Graph' />
        <NavLink link='/vis-6' text='Vis 6 - United States Degree Attainment (FCC Choropleth Map)' />
        <NavLink link='/vis-7' text='Vis 7 - IMDb USA Votes 1890-2020' />
        <NavLink link='/vis-8' text='Vis 8 - USD GDP 1947-2020 (FCC Bar Chart)'/>
        <NavLink link='/vis-9' text='Vis 9 - Doping in Pro Cycling 1994-2016 (FCC Scatterplot)'/>
        <NavLink link='/vis-10' text='Vis 10 - Better Clock'/>
        <NavLink link='/vis-11' text='Vis 11 - Monthly Land Surface Temperature 1753-2015 (FCC Heatmap)'/>
        <NavLink link='/missing-migrants' text='SERIES: Missing Migrants (3 vis)'/>
        <NavLink link='/vis-12' text='Vis 12 - Movie Sales (FCC Treemap)'/>
        <NavLink link='/nuclear-power' text='SERIES: Nuclear Power'/>
        <NavLink link='/vis-13' text='Vis 13'/>
      </ul>
    </nav>
  );
};

export default Home;
