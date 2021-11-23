import csvData from './data/css named colours - Sheet1.txt';
import React from 'react';
import { csvParse } from 'd3-dsv';
import { arc } from 'd3-shape';
import { pie } from 'd3-shape';

const Vis2 = () => {
  const data = csvParse(csvData);
  const width = window.innerWidth;
  const height = window.innerHeight;
  const centerX = width / 2;
  const centerY = height / 2;
  const pieArc = arc().innerRadius(0).outerRadius(width);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${centerX}, ${centerY})`}>
        {pie().value(1)(data).map((el) => (
          <path key={el.data.Keyword} fill={el.data.hexValue} d={pieArc(el)} />
        ))}
        {/* {data.map((el, i) => (
          <path
            key={el.Keyword}
            fill={el.hexValue}
            d={pieArc({
              startAngle: (i / data.length) * 2 * Math.PI,
              endAngle: ((i + 1) / data.length) * 2 * Math.PI,
            })}
          />
        ))} */}
      </g>
    </svg>
  );
};

export default Vis2;
