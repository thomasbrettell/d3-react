import React, { useState, useCallback, useEffect } from 'react';
import useData from '../../hooks/useData';
import styled from 'styled-components';
import { scaleLinear, scaleTime } from 'd3-scale';
import { extent, max } from 'd3-array';
import { timeFormat } from 'd3-time-format';

const H1 = styled.h1`
  text-align: center;
`;

const TickLine = styled.line`
  stroke: #ffffff54;
`;

const VisBox = styled.div`
  display: flex;
  justify-content: center;
`;

const YAxisText = styled.text`
  fill: white;
  text-anchor: end;
`;

const XAxisText = styled.text`
  fill: white;
  text-anchor: middle;
`;

const Tooltip = styled.g`
  text {
    fill: var(--color-primary);
  }
`;

const Vis8 = () => {
  const fccEl = document.getElementById('fcc_test_suite_wrapper');
  fccEl.style.display = 'block';

  const [tooltip, setTooltip] = useState(null);
  const [data, setData] = useState(null);
  const transformData = useCallback((data) => {
    setData(data.data);
  }, []);
  const { sendRequest } = useData(transformData);

  console.log(tooltip);

  useEffect(() => {
    sendRequest({
      url: 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json',
    });

    return () => {
      fccEl.style.display = 'none';
    };
  }, [sendRequest, fccEl]);

  if (!data) {
    return <p>Fetching data...</p>;
  }
  console.log(data);

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

  const yVal = (dp) => dp[1];
  const yScale = scaleLinear()
    .domain([0, max(data, yVal)])
    .range([innerHeight, 0]);

  const xVal = (dp) => new Date(dp[0]);
  const xScale = scaleTime().domain(extent(data, xVal)).range([0, innerWidth]);

  return (
    <>
      <H1 id='title'>US GDP 1947-2020</H1>
      <VisBox>
        <svg height={height} width={width}>
          {tooltip && (
            <Tooltip
              id='tooltip'
              transform='translate(150, 50)'
              data-date={tooltip[0]}
              data-gdp={tooltip[1]}
            >
              <rect width='200' height='65' fill='white'></rect>
              <text transform='translate(20, 25)'>GDP: {tooltip[1]}</text>
              <text transform='translate(20, 50)'>Date: {tooltip[0]}</text>
            </Tooltip>
          )}
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <g id='x-axis'>
              {xScale.ticks().map((tick) => (
                <g
                  key={tick}
                  transform={`translate(${xScale(tick)}, 7)`}
                  className='tick'
                >
                  <TickLine
                    y2={-7}
                    transform={`translate(0, ${innerHeight})`}
                  />
                  <XAxisText y={innerHeight} dy='1em'>
                    {timeFormat('%Y')(tick)}
                  </XAxisText>
                </g>
              ))}
            </g>
            <g id='y-axis'>
              {yScale.ticks().map((tick) => (
                <g
                  key={tick}
                  transform={`translate(0, ${yScale(tick)})`}
                  className='tick'
                >
                  <TickLine x2={innerWidth} />
                  <YAxisText dy='.32em' x='-7'>
                    {tick}
                  </YAxisText>
                </g>
              ))}
            </g>
            {data.map((dp, i) => (
              <rect
                key={i}
                height={innerHeight - yScale(dp[1])}
                x={xScale(new Date(dp[0]))}
                fill='red'
                width={innerWidth / data.length}
                transform={`translate(0, ${yScale(dp[1])})`}
                className='bar'
                data-date={dp[0]}
                data-gdp={dp[1]}
                onMouseEnter={() => setTooltip([dp[0], dp[1]])}
                onMouseOut={() => setTooltip(null)}
              ></rect>
            ))}
          </g>
        </svg>
      </VisBox>
    </>
  );
};

export default Vis8;
