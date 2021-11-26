import React, { useRef, useEffect, useMemo } from 'react';
import { scaleTime, scaleLinear } from 'd3-scale';
import { extent, max, bin, sum } from 'd3-array';
import { timeMonths } from 'd3-time';
import styled from 'styled-components';
import { timeFormat } from 'd3-time-format';
import { brushX } from 'd3-brush';
import { select } from 'd3-selection';

const dateFormat = timeFormat('%d/%m/%Y');

const TickLine = styled.line`
  stroke: #ffffff54;
`;

const Bar = styled.rect`
  fill: red;
  stroke: white;
  stroke-width: 0.25;
`;

const yVal = (dp) => dp['Total Number of Dead and Missing'];

const Histogram = ({ migrantData, height, setBrushExtent, xVal }) => {
  const brushRef = useRef();
  const width = 960;
  const margin = { top: 0, right: 30, bottom: 0, left: 60 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xScale = useMemo(
    () =>
      scaleTime()
        .domain(extent(migrantData, xVal))
        .range([0, innerWidth])
        .nice(),
    [innerWidth, migrantData, xVal]
  );

  const binnedData = useMemo(() => {
    const [start, stop] = xScale.domain();
    return bin()
      .value(xVal)
      .domain(xScale.domain())
      .thresholds(timeMonths(start, stop))(migrantData)
      .map((arr) => ({
        y: sum(arr, yVal),
        x0: arr.x0,
        x1: arr.x1,
      }));
  }, [migrantData, xScale, xVal]);

  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain([0, max(binnedData, (dp) => dp.y)])
        .range([innerHeight, 0])
        .nice(),
    [binnedData, innerHeight]
  );

  useEffect(() => {
    const brush = brushX()
      .extent([
        [0, 0],
        [innerWidth, innerHeight],
      ])
      .on('brush end', (e) =>
        setBrushExtent(e.selection && e.selection.map(xScale.invert))
      );
    brush(select(brushRef.current));
  }, [innerHeight, innerWidth, xScale, setBrushExtent]);

  return useMemo(
    () => (
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {yScale.ticks(6).map((tick) => (
          <g key={tick} transform={`translate(0, ${yScale(tick)})`}>
            <TickLine x1='-10' x2={innerWidth} />
            <text
              fill='white'
              textAnchor='end'
              dy='.32em'
              x='-14'
              fontSize='0.5em'
            >
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
              fontSize='0.5em'
            >
              {dateFormat(tick)}
            </text>
          </g>
        ))}

        {binnedData.map((dp, i) => (
          <Bar
            key={i}
            x={xScale(dp.x0)}
            y={yScale(dp.y)}
            width={xScale(dp.x1) - xScale(dp.x0)} //distance between last and first date
            height={innerHeight - yScale(dp.y)}
          ></Bar>
        ))}
        <g ref={brushRef} />
      </g>
    ),
    [
      binnedData,
      innerHeight,
      innerWidth,
      margin.left,
      margin.top,
      xScale,
      yScale,
    ]
  );
};

export default Histogram;
