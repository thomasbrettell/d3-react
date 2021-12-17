import React, { useState } from 'react';
import csvData from './data/iris-csv.txt';
import { csvParse } from 'd3-dsv';
import { extent } from 'd3-array';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import styled from 'styled-components';
import { Select } from '@geist-ui/react';

const radius = 10;

const VisBox = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 50px;
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
  opacity: 0.7;
  transition: opacity 0.1s ease-in-out;

  ${(p) =>
    p.notSelected &&
    `
    opacity: 0.1;
  `}
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

const InputControl = styled.label`
  display: inline-flex;
  flex-direction: column;

  & + & {
    margin-left: 20px;
  }
`;

const ColourScale = styled.g`
  cursor: pointer;
  transition: opacity 0.1s ease-in-out;

  ${(p) =>
    p.notSelected &&
    `
    opacity: 0.1;
  `}
`;

const Vis4 = () => {
  const [yPlot, setYPlot] = useState('sepal_width');
  const [xPlot, setXPlot] = useState('sepal_length');
  const [hoveredValue, setHoveredValue] = useState(null);

  const data = csvParse(csvData).map((dp) => {
    for (const prop in dp) {
      if (prop === 'species') {
        continue;
      }
      dp[prop] = +dp[prop];
    }
    return dp;
  });

  const axisOptions = [
    'petal_length',
    'petal_width',
    'sepal_length',
    'sepal_width',
  ];

  const width = 980;
  const height = 460;
  const margin = {
    top: 40,
    right: 40,
    bottom: 60,
    left: 70,
  };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const yScale = scaleLinear()
    .domain(extent(data, (dp) => dp[yPlot]))
    .range([0, innerHeight])
    .nice();

  const xScale = scaleLinear()
    .domain(extent(data, (dp) => dp[xPlot]))
    .range([0, innerWidth])
    .nice();

  const colorVal = (dp) => dp.species;
  const colorScale = scaleOrdinal()
    .domain(data.map(colorVal))
    .range(['orange', 'purple', 'green']);

  return (
    <>
      <VisBox>
        <svg height={height} width={width}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            {xScale.ticks().map((tick) => (
              <g key={tick} transform={`translate(${xScale(tick)}, 0)`}>
                <TickLine y2={innerHeight} />
                <XAxisText y={innerHeight} dy='1em'>
                  {tick}
                </XAxisText>
              </g>
            ))}
            {yScale.ticks().map((tick) => (
              <g key={tick} transform={`translate(0, ${yScale(tick)})`}>
                <TickLine x2={innerWidth} />
                <YAxisText dy='.32em' x='-6'>
                  {tick}
                </YAxisText>
              </g>
            ))}
            <XAxisLabel x={innerWidth / 2} y={innerHeight + 50}>
              {xPlot}
            </XAxisLabel>
            <YAxisLabel
              transform={`translate(${-50}, ${innerHeight / 2}) rotate(-90)`}
            >
              {yPlot}
            </YAxisLabel>
            {colorScale.domain().map((color, i) => (
              <ColourScale
                key={color}
                transform={`translate(${120 * i + 20}, -20)`}
                onMouseEnter={() => setHoveredValue(color)}
                onMouseOut={() => setHoveredValue(null)}
                notSelected={color !== hoveredValue && hoveredValue !== null}
              >
                <circle r='10' cy='-5' fill={colorScale(color)}></circle>
                <text fill='white' x='15'>
                  {color}
                </text>
              </ColourScale>
            ))}
            {data.map((dp, i) => (
              <CirclePlot
                key={i}
                cx={xScale(dp[xPlot])}
                cy={yScale(dp[yPlot])}
                r={radius}
                fill={colorScale(dp.species)}
                notSelected={
                  dp.species !== hoveredValue && hoveredValue !== null
                }
              >
                <title>{dp.species}</title>
              </CirclePlot>
            ))}
          </g>
        </svg>
      </VisBox>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <InputControl>
          <span>y-axis</span>
          <Select value={yPlot} onChange={(val) => setYPlot(val)}>
            {axisOptions.map((option) => (
              <Select.Option key={option} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        </InputControl>

        <InputControl>
          <span>x-axis</span>
          <Select value={xPlot} onChange={(val) => setXPlot(val)}>
            {axisOptions.map((option) => (
              <Select.Option key={option} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        </InputControl>
      </div>
    </>
  );
};

export default Vis4;
