import { extent, bin, sum, max } from 'd3-array';
import { scaleLinear, scaleTime } from 'd3-scale';
import React from 'react';
import { timeFormat } from 'd3-time-format';
import styled from 'styled-components';
import { timeMonths } from 'd3-time';

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

  const [start, stop] = xScale.domain();
  const binnedData = bin()
    .value(xVal)
    .domain(xScale.domain())
    .thresholds(timeMonths(start, stop))(data)
    .map((arr) => ({
      y: sum(arr, yVal),
      x0: arr.x0,
      x1: arr.x1,
    }));

  const yScale = scaleLinear()
    .domain([0, max(binnedData, (dp) => dp.y)])
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
              {tick}
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

        {binnedData.map((dp, i) => (
          <rect
            key={i}
            fill='white'
            x={xScale(dp.x0)}
            y={yScale(dp.y)}
            width={xScale(dp.x1) - xScale(dp.x0)} //distance between last and first date
            height={innerHeight - yScale(dp.y)}
          >
            <title>{dp.y}</title>
          </rect>
        ))}
      </g>
    </svg>
  );
};

export default Vis;
