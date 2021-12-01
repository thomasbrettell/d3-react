import React, { useMemo } from 'react';
import styled from 'styled-components';
import County from './County';
import { geoPath } from 'd3-geo';
import { scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';

const GeoPathStates = styled.path`
  fill: none;
  stroke: var(--color-primary);
  stroke-width: 0.5;
`;

const width = 960;
const height = 600;

const path = geoPath();

const colorVal = (dp) => dp.bachelorsOrHigher;

const Svg = ({ states, counties, data, setTooltipData }) => {
  const colorScale = useMemo(
    () =>
      scaleLinear()
        .domain(extent(data, colorVal))
        .range(['#e5f5e0', '#006d2c']),
    [data]
  );

  console.log(colorScale.ticks());

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${width - 300}, 0)`}>
        {colorScale.ticks().map((tick, i) => (
          <g key={tick} transform={`translate(${30 * i}, 0)`} id='legend'>
            <line stroke='#ffffff78' y2='40' transform={`translate(15, 0)`}></line>
            <text y='50' x='5' fill='white' fontSize='10px' >
              {tick}%
            </text>
            <rect height='30' width='30' fill={colorScale(tick)}></rect>
          </g>
        ))}
      </g>
      {useMemo(
        () =>
          counties.features.map((dp) => {
            const county = data.find((el) => el.fips === dp.id);
            return (
              <County
                key={dp.id}
                d={path(dp)}
                county={county}
                fill={colorScale(county.bachelorsOrHigher)}
                onHover={setTooltipData}
              />
            );
          }),
        [colorScale, counties.features, data, setTooltipData]
      )}
      {useMemo(() => {
        return states.features.map((dp) => {
          return <GeoPathStates key={dp.id} d={path(dp)} />;
        });
      }, [states.features])}
    </svg>
  );
};

export default Svg;
