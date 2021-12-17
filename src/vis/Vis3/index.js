import React, { useCallback } from 'react';
import csvData from './data/UN-Country-pop-2020.txt';
import { csvParse } from 'd3-dsv';
import { scaleBand, scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { format } from 'd3-format';
import styled from 'styled-components';

const VisBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const TickLine = styled.line`
  stroke: #ffffff54;
`;

const Bar = styled.rect`
  fill: white;
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
  font-size: 2em;
`;

const Vis3 = () => {
  const data = csvParse(csvData)
    .map((el) => {
      el.Population = +el['2020'] * 1000;
      return el;
    })
    .slice(0, 10);

  const width = 980;
  const height = 460;
  const margin = {
    top: 0,
    right: 40,
    bottom: 60,
    left: 200,
  };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const yScale = scaleBand()
    .domain(data.map((dp) => dp.Country))
    .range([0, innerHeight])
    .paddingInner(0.1);

  const xScale = scaleLinear()
    .domain([0, max(data, (dp) => dp.Population)])
    .range([0, innerWidth]);
  console.log(data);

  const formatXAxisTick = useCallback((n) => {
    return format('.2s')(n).replace(/G/, 'B');
  }, []);

  return (
    <VisBox>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {xScale.ticks().map((tick) => (
            <g key={tick} transform={`translate(${xScale(tick)}, 0)`}>
              <TickLine y2={innerHeight} />
              <XAxisText y={innerHeight} dy='1em'>
                {formatXAxisTick(tick)}
              </XAxisText>
            </g>
          ))}
          {yScale.domain().map((tick) => (
            <g
              key={tick}
              transform={`translate(0, ${
                yScale(tick) + yScale.bandwidth() / 2
              })`}
            >
              <YAxisText dy='.32em' x='-6'>
                {tick}
              </YAxisText>
            </g>
          ))}
          <XAxisLabel x={innerWidth / 2} y={innerHeight + 50}>
            Population
          </XAxisLabel>
          {data.map((dp) => (
            <Bar
              key={dp.Country}
              x={0}
              y={yScale(dp.Country)}
              width={xScale(dp.Population)}
              height={yScale.bandwidth()}
            >
              <title>{dp.Population}</title>
            </Bar>
          ))}
        </g>
      </svg>
    </VisBox>
  );
};

export default Vis3;
