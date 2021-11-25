import React, { useEffect, useState, useCallback } from 'react';
import useData from '../../hooks/useData';
import VisBox from '../../components/VisBox';
import styled from 'styled-components';
import { scaleLinear, scaleTime } from 'd3-scale';
import { extent } from 'd3-array';
import { timeFormat } from 'd3-time-format';
import DataPoint from './components/DataPoint';

const H1 = styled.h1`
  text-align: center;
`;

const TickLine = styled.line`
  stroke: #ffffff54;
`;

const Vis9 = () => {
  const fccEl = document.getElementById('fcc_test_suite_wrapper');
  fccEl.style.display = 'block';
  const [data, setData] = useState(null);
  const transformData = useCallback((data) => {
    setData(data);
  }, []);
  const { sendRequest } = useData(transformData);

  useEffect(() => {
    sendRequest({
      url: 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json',
    });

    return () => {
      fccEl.style.display = 'none';
    };
  }, [sendRequest, fccEl]);

  if (!data) {
    return <p>Fetching data...</p>;
  }

  const width = 980;
  const height = 500;
  const margin = {
    top: 40,
    right: 40,
    bottom: 60,
    left: 70,
  };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  const minSecFormat = timeFormat('%M:%S');

  const yVal = (dp) => dp.Seconds;
  const yScale = scaleTime()
    .domain(extent(data, yVal))
    .range([0, innerHeight])
    .nice();

  const xVal = (dp) => dp.Year;
  const xScale = scaleLinear()
    .domain(extent(data, xVal))
    .range([0, innerWidth])
    .nice();

  console.log(data);
  return (
    <>
      <H1 id='title'>Doping in Pro Cycling 1994-2015</H1>
      <VisBox>
        <svg height={height} width={width}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <g id='y-axis'>
              {yScale.ticks().map((tick, i) => (
                <g
                  key={i}
                  transform={`translate(0, ${yScale(tick)})`}
                  className='tick'
                >
                  <TickLine x2={innerWidth} />
                  <text fill='white' dy='.32em' x='-7' textAnchor='end'>
                    {minSecFormat(new Date(0).setSeconds(tick))}
                  </text>
                </g>
              ))}
            </g>

            <g id='x-axis'>
              {xScale.ticks().map((tick) => (
                <g
                  key={tick}
                  transform={`translate(${xScale(tick)}, 0)`}
                  className='tick'
                >
                  <TickLine y2={innerHeight} />
                  <text
                    fill='white'
                    y={innerHeight}
                    dy='1em'
                    textAnchor='middle'
                  >
                    {tick}
                  </text>
                </g>
              ))}
            </g>

            <g transform={`translate(${innerWidth - 250}, -20)`} id='legend'>
              <g>
                <circle fill='red' r='10' />
                <text dy='.32em' x='15' fill='white'>
                  Doping
                </text>
              </g>
              <g transform={`translate(120, 0)`}>
                <circle fill='blue' r='10' />
                <text dy='.32em' x='15' fill='white'>
                  Not Doping
                </text>
              </g>
            </g>

            {data.map((dp, i) => {
              return (
                <DataPoint key={i} dp={dp} xScale={xScale} yScale={yScale} />
              );
            })}
          </g>
        </svg>
      </VisBox>
    </>
  );
};

export default Vis9;
