import { extent, max } from 'd3-array';
import { scaleTime, scaleLog } from 'd3-scale';
import React from 'react';
import { timeFormat } from 'd3-time-format';
import styled from 'styled-components';

const dateFormat = timeFormat('%d/%m/%Y');

const TickLine = styled.line`
  stroke: #ffffff54;
`;

const Vis = ({ data }) => {
  const width = 1000;
  const height = 600;
  const margin = {
    top: 40,
    right: 40,
    bottom: 60,
    left: 100,
  };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xVal = (dp) => dp['Incident Date'];
  const xScale = scaleTime()
    .domain(extent(data, xVal))
    .range([0, innerWidth])
    .nice();

  const yVal = (dp) => dp['Total Number of Dead and Missing'];

  const yScale = scaleLog()
    .domain([1, max(data, yVal)])
    .range([innerHeight, 0])
    .nice();

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <text
          fill='white'
          transform={`translate(-70, ${innerHeight / 2}) rotate(-90) `}
          textAnchor='middle'
          fontWeight='bold'
        >
          Total Dead or Missing
        </text>

        <text
          fill='white'
          transform={`translate(${innerWidth / 2}, ${innerHeight + 60})`}
          textAnchor='middle'
          fontWeight='bold'
        >
          Month
        </text>

        {yScale.ticks().map((tick) => (
          <g key={tick} transform={`translate(0, ${yScale(tick)})`}>
            <TickLine x1='-10' x2={innerWidth} />
            <text fill='white' textAnchor='end' dy='.32em' x='-14'>
              {yScale.tickFormat()(tick)}
            </text>
          </g>
        ))}

        {xScale.ticks().map((tick) => (
          <g key={tick} transform={`translate(${xScale(tick)}, 0)`}>
            <TickLine y2={innerHeight + 10} />
            <text
              fill='white'
              y={innerHeight + 14}
              textAnchor='middle'
              dy='1em'
            >
              {dateFormat(tick)}
            </text>
          </g>
        ))}

        {data.map((dp, i) => (
          <circle
            key={i}
            fill='white'
            cx={xScale(dp['Incident Date'])}
            cy={yScale(dp['Total Number of Dead and Missing'])}
            r={2}
          />
        ))}
      </g>
    </svg>
  );
};

export default Vis;
