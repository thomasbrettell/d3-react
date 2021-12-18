import React from 'react';
import { scaleBand, scaleLinear, max } from 'd3';

const prefix = (property) => {
  switch (property) {
    case 'global_energy_share':
      return '%';
    case 'co2_tonnes_per_gwh':
      return 't';
    default:
      return '';
  }
};

const Data = ({ data, width, height, selectedProperty }) => {
  const margin = {
    top: 20,
    right: 0,
    bottom: 20,
    left: 0,
  };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xVal = (dp) => dp.source;
  const xScale = scaleBand()
    .domain(data.data.map(xVal))
    .range([0, innerWidth])
    .padding(0.2);

  const yVal = (dp) => dp[selectedProperty];
  const yScale = scaleLinear()
    .domain([0, max(data.data, yVal)])
    .range([0, innerHeight])
    .nice();

  return (
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      {xScale.domain().map((tick) => (
        <g
          key={tick}
          transform={`translate(${xScale(tick) + xScale.bandwidth() / 2}, 0)`}
        >
          <text
            fill='white'
            y={innerHeight + 7}
            dy='1em'
            fontSize='10'
            textAnchor='middle'
          >
            {tick}
          </text>
        </g>
      ))}
      {data.data.map((dp) => (
        <g
          key={dp.source}
          transform={`translate(${xScale(dp.source)}, ${
            innerHeight - yScale(dp[selectedProperty])
          })`}
        >
          <text
            fill='white'
            textAnchor='middle'
            y='-7'
            x={xScale.bandwidth() / 2}
            fontSize='10'
          >
            {dp[selectedProperty] + prefix(selectedProperty)}
          </text>
          <rect
            width={xScale.bandwidth()}
            height={yScale(dp[selectedProperty])}
            fill='white'
          />
        </g>
      ))}
    </g>
  );
};

export default Data;
