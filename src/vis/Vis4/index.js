import React, { useState } from 'react';
import csvData from './data/iris-csv.txt';
import { csvParse } from 'd3-dsv';
import { extent } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import styled from 'styled-components';

const VisBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
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

const InputControl = styled.label`
  display: inline-flex;
  flex-direction: column;

  & + & {
    margin-left: 20px;
  }
`;

const Vis4 = () => {
  const [radius, setRadius] = useState(10);
  const [yPlot, setYPlot] = useState('sepal_width');
  const [xPlot, setXPlot] = useState('sepal_length');

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
    top: 20,
    right: 40,
    bottom: 60,
    left: 70,
  };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const yScale = scaleLinear()
    .domain(extent(data, (dp) => dp[yPlot]))
    .range([0, innerHeight]);

  const xScale = scaleLinear()
    .domain(extent(data, (dp) => dp[xPlot]))
    .range([0, innerWidth])
    .nice();

  console.log(data);
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
            {data.map((dp, i) => (
              <CirclePlot
                key={i}
                cx={xScale(dp[xPlot])}
                cy={yScale(dp[yPlot])}
                r={radius}
              >
                <title>{dp.species}</title>
              </CirclePlot>
            ))}
          </g>
        </svg>
      </VisBox>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <InputControl>
          <span>radius</span>
          <input
            type='range'
            min='1'
            max='20'
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
          />
        </InputControl>

        <InputControl>
          <span>y-axis</span>
          <select value={yPlot} onChange={(e) => setYPlot(e.target.value)}>
            {axisOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </InputControl>

        <InputControl>
          <span>x-axis</span>
          <select value={xPlot} onChange={(e) => setXPlot(e.target.value)}>
            {axisOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </InputControl>
      </div>
    </>
  );
};

export default Vis4;
