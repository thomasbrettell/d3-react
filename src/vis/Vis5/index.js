import React from 'react';
import csvData from './data/week_temp_sf.txt';
import { csvParse } from 'd3-dsv';
import { extent } from 'd3-array';
import { scaleLinear, scaleTime } from 'd3-scale';
import styled from 'styled-components';
import { timeFormat } from 'd3-time-format';
import { line } from 'd3-shape';
import { curveNatural } from 'd3-shape';

const H1 = styled.h1`
  text-align: center;
`

const VisBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const TickLine = styled.line`
  stroke: #ffffff54;
`;

const YAxisText = styled.text`
  fill: white;
  text-anchor: end;
`;

const XAxisText = styled.text`
  fill: white;
  text-anchor: middle;
`;

const CirclePlot = styled.circle`
  fill: #ffffffb0;
`;

const XAxisLabel = styled.text`
  fill: white;
  text-anchor: middle;
  font-weight: bold;
`;

const YAxisLabel = styled.text`
  fill: white;
  text-anchor: middle;
  font-weight: bold;
`;

const Vis5 = () => {
  const data = csvParse(csvData).map((dp) => {
    dp.temperature = +dp.temperature;
    dp.timestamp = new Date(dp.timestamp);
    return dp;
  });

  const width = 980;
  const height = 460;
  const margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 70,
  };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xVal = (dp) => dp.timestamp;
  const xLabel = 'Day of the Week';
  const xScale = scaleTime()
    .domain(extent(data, xVal))
    .range([0, innerWidth])
    .nice();

  const yVal = (dp) => dp.temperature;
  const yLabel = 'Temperature';
  const yScale = scaleLinear()
    .domain(extent(data, yVal))
    .range([innerHeight, 0])
    .nice();

  console.log(data);
  return (
    <>
    <H1>Weekly Temperature in San Francisco 2015</H1>
    <VisBox>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {xScale.ticks().map((tick) => (
            <g key={tick} transform={`translate(${xScale(tick)}, 7)`}>
              <TickLine y2={innerHeight} />
              <XAxisText y={innerHeight} dy='1em'>
                {timeFormat('%a')(tick)}
              </XAxisText>
            </g>
          ))}
          {yScale.ticks().map((tick) => (
            <g key={tick} transform={`translate(0, ${yScale(tick)})`}>
              <TickLine x2={innerWidth} />
              <YAxisText dy='.32em' x='-7'>
                {tick}
              </YAxisText>
            </g>
          ))}
          <XAxisLabel x={innerWidth / 2} y={innerHeight + 50}>
            {xLabel}
          </XAxisLabel>
          <YAxisLabel
            transform={`translate(${-50}, ${innerHeight / 2}) rotate(-90)`}
          >
            {yLabel}
          </YAxisLabel>
          <path
            fill='none'
            stroke='white'
            strokeLinejoin='round'
            d={line()
              .curve(curveNatural)
              .x((d) => xScale(xVal(d)))
              .y((d) => yScale(yVal(d)))(data)}
          />
          {data.map((dp, i) => (
              <CirclePlot
                key={i}
                cx={xScale(dp.timestamp)}
                cy={yScale(dp.temperature)}
                r={1.5}
              />
          ))}
        </g>
      </svg>
    </VisBox>
  </>);
};

export default Vis5;
