import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { csvParse } from 'd3-dsv';
import { scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import useData from '../../hooks/useData';

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

const CirclePlot = styled.circle`
  fill: #ffffff14;
`;

const Vis7 = () => {
  const [xSelect, setXSelect] = useState('year')
  const [data, setData] = useState(null);
  const transformData = useCallback((data) => {
    setData(csvParse(data));
  }, []);
  const { sendRequest } = useData(transformData, 'text');

  useEffect(() => {
    sendRequest({
      url: 'https://gist.githubusercontent.com/thomasbrettell/53d4ac83ceaa9bba8206893b9bfcb82b/raw/22db7934e1c349fc2f22c24e027808905b9c960e/imdb-movies-usa.csv',
    });
  }, [sendRequest]);

  if (!data) {
    return <p>Fetching data...</p>;
  }
  console.log(data)

  const selectXHandler = () => {
    setXSelect(xSelect === 'year' ? 'duration' : 'year')
  }

  const width = window.innerWidth;
  const height = window.innerHeight - 100;
  const margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 70,
  };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xVal = (dp) => +dp[xSelect];
  const xScale = scaleLinear()
    .domain(extent(data, xVal))
    .range([0, innerWidth])
    .nice();

  const ySelect = 'avg_vote';
  const yVal = (dp) => +dp[ySelect];
  const yScale = scaleLinear()
    .domain(extent(data, yVal))
    .range([innerHeight, 0])
    .nice();

  return (<>
    <VisBox>
      <svg width={width} height={height}>
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
              <YAxisText dy='.32em' x='-7'>
                {tick}
              </YAxisText>
            </g>
          ))}
          <XAxisLabel x={innerWidth / 2} y={innerHeight + 50}>
            {xSelect === 'year' ? 'Year' : 'Duration (min)'}
          </XAxisLabel>
          <YAxisLabel
            transform={`translate(${-50}, ${innerHeight / 2}) rotate(-90)`}
          >
            Average Vote
          </YAxisLabel>
          {data.map((dp, i) => (
            <CirclePlot
              key={i}
              cx={xScale(dp[xSelect])}
              cy={yScale(dp[ySelect])}
              r={3}
            >
              <title>{dp.title}</title>
            </CirclePlot>
          ))}
        </g>
      </svg>
    </VisBox>
    <button onClick={selectXHandler}>Show {xSelect === 'year' ? 'duration' : 'year'}</button>
  </>);
};

export default Vis7;
