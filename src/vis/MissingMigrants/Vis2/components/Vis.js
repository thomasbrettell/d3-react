import React, { useState } from 'react';
import BubbleMap from './BubbleMap';
import Histogram from './Histogram';
const xVal = (dp) => dp['Incident Date'];

const Vis = ({ topology, interiors, migrantData }) => {
  const [brushExtent, setBrushExtent] = useState(null);
  const width = 960;
  const height = 625;
  const histogramSize = 0.2;

  const migrantsFiltered = brushExtent
    ? migrantData.filter((dp) => {
        const data = xVal(dp);
        return data > brushExtent[0] && data < brushExtent[1];
      })
    : migrantData;

  return (
    <svg height={height} width={width} overflow='visible'>
      <BubbleMap
        topology={topology}
        interiors={interiors}
        migrantData={migrantData}
        filteredData={migrantsFiltered}
      />
      <g transform={`translate(0, ${height - height * histogramSize})`}>
        <Histogram
          migrantData={migrantData}
          height={height * histogramSize}
          setBrushExtent={setBrushExtent}
          xVal={xVal}
        />
      </g>
    </svg>
  );
};

export default Vis;
