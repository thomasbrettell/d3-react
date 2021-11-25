import React, { useMemo } from 'react';
import getMonthFromNumber from '../utils/getMonthFromNumber';
import { scaleBand, scaleSequential } from 'd3-scale';
import { extent } from 'd3-array';
import { interpolateRdYlBu } from 'd3-scale-chromatic';
import Cell from './Cell';

const fourChunks = ([a, b]) => {
  const max = Math.max(a, b);
  const min = Math.min(a, b);
  const range = Math.abs(a) + Math.abs(b);
  const increment = range / 3;

  return [min, min + increment, max - increment, max];
};

const Visualisation = ({ data, onSetTooltip }) => {
  return useMemo(() => {
    const { baseTemperature, monthlyVariance } = data;

    const width = 1300;
    const height = 600;
    const margin = {
      top: 40,
      right: 40,
      bottom: 60,
      left: 100,
    };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xVal = (dp) => dp.year;
    const xScale = scaleBand()
      .domain(monthlyVariance.map(xVal))
      .range([0, innerWidth]);

    const yVal = (dp) => dp.month;
    const yScale = scaleBand()
      .domain(monthlyVariance.map(yVal))
      .range([0, innerHeight]);

    const colourVal = (dp) => dp.variance;
    const colourScale = scaleSequential()
      .domain(extent(monthlyVariance, colourVal).reverse())
      .interpolator(interpolateRdYlBu);

    return (
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g id='x-axis'>
            {xScale
              .domain()
              .filter((i) => i % 15 === 0)
              .map((tick) => (
                <g
                  key={tick}
                  transform={`translate(${xScale(tick)}, ${innerHeight})`}
                  className='tick'
                >
                  <line stroke='white'></line>
                  <text fill='white' dy='1em' textAnchor='middle'>
                    {tick}
                  </text>
                </g>
              ))}
          </g>
          <g id='y-axis'>
            {yScale.domain().map((tick) => (
              <g
                key={tick}
                transform={`translate(0, ${yScale(tick)})`}
                className='tick'
              >
                <line stroke='white'></line>
                <text fill='white' dy='.32em' y='21' x='-7' textAnchor='end'>
                  {getMonthFromNumber(tick)}
                </text>
              </g>
            ))}
          </g>
          <g id='legend' transform={`translate(0, ${innerHeight + 60})`}>
            {fourChunks(colourScale.domain()).map((dp, i) => (
              <g key={i} transform={`translate(${60 * i}, -20)`}>
                <rect fill={colourScale(dp)} width='60' height='20' />
                <text
                  fill='white'
                  y='-.3em'
                  x='50'
                  dx='-.3em'
                  textAnchor='end'
                  fontSize='.7em'
                >
                  {Math.round((baseTemperature + dp + Number.EPSILON) * 100) /
                    100}
                  °
                </text>
              </g>
            ))}
          </g>
          {monthlyVariance.map((dp, i) => (
            <Cell
              key={i}
              dp={dp}
              xScale={xScale}
              yScale={yScale}
              colourScale={colourScale}
              baseTemp={baseTemperature}
              onSetTooltip={onSetTooltip}
            />
          ))}
        </g>
      </svg>
    );
  }, [data, onSetTooltip]);
};

export default Visualisation;
