import React, { useMemo } from 'react';
import { scaleBand, max, scaleLinear } from 'd3';
import sumAllCategories from '../utils/sumAllCategories';

const Data = ({ selectedCountry, data, height, width }) => {
  const margin = {
    top: 60,
    right: 0,
    bottom: 20,
    left: 70,
  };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const countryData = data[selectedCountry];
  const transformedData = sumAllCategories(countryData.data);

  const xVal = useMemo(() => (dp) => dp.cat, []);
  const xScale = scaleBand()
    .domain(transformedData.map(xVal))
    .range([0, innerWidth])
    .paddingInner(0.2)
    .paddingOuter(0.2);

  const yVal = useMemo(() => (dp) => dp.value, []);
  const yScale = scaleLinear()
    .domain([0, max(transformedData, yVal)])
    .range([innerHeight, 0])
    .nice();

  return (
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      <text
        fontSize='12'
        fill='white'
        fontWeight='bold'
        textAnchor='middle'
        transform={`translate(-50,${innerHeight / 2}) rotate(-90)`}
      >
        TWh
      </text>
      {xScale.domain().map((cat) => (
        <g
          key={cat}
          transform={`translate(${xScale(cat) + xScale.bandwidth() / 2}, 0)`}
        >
          <text
            fill='white'
            fontSize='10'
            y={innerHeight + 7}
            dy='1em'
            textAnchor='middle'
          >
            {cat}
          </text>
        </g>
      ))}
      {yScale.ticks().map((tick) => (
        <g
          key={tick}
          transform={`translate(0, ${
            innerHeight - (innerHeight - yScale(tick))
          })`}
        >
          <line x2={innerWidth} stroke='#333' />
          <text fill='white' fontSize='10' textAnchor='end' dy='0.3em' x='-7'>
            {tick}
          </text>
        </g>
      ))}
      {transformedData.map((dp) => (
        <rect
          key={dp.cat}
          y={0}
          x={xScale(dp.cat)}
          width={xScale.bandwidth()}
          height={innerHeight - yScale(dp.value)}
          fill='white'
          transform={`translate(0, ${
            innerHeight - (innerHeight - yScale(dp.value))
          })`}
        ></rect>
      ))}
    </g>
  );
};

export default Data;
