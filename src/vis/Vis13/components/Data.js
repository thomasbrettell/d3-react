import React from 'react';
import { geoPath, geoNaturalEarth1 } from 'd3';
import styled from 'styled-components';
import { scaleLinear, extent } from 'd3';

const GeoPath = styled.path`
  stroke: none;

  &:hover {
    stroke: red;
  }
`;

const GeoInterior = styled.path`
  fill: none;
  stroke-width: 0.2;
  stroke: black;
`;

const path = geoPath(geoNaturalEarth1());

const targetProperty = 'population';

const Data = ({ data, width, height, topology, interiors, selectedYear }) => {
  const margin = {
    top: 20,
    right: 0,
    bottom: 20,
    left: 0,
  };
  // const innerWidth = width - margin.left - margin.right;
  // const innerHeight = height - margin.top - margin.bottom;

  const colorVal = (dp) => {
    const yearData = data[dp].data.find(
      (el) => el.year.toString() === selectedYear.toString()
    );
    if (yearData) {
      return yearData[targetProperty];
    }
  };

  const colorScale = scaleLinear()
    .domain(extent(Object.keys(data), colorVal))
    .range(['#e5f5e0', '#006d2c']);

  console.log(colorScale.domain());

  return (
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      <g>
        {topology.features.map((dp) => {
          const property = data[dp.properties.name]?.data.find(
            (el) => el.year.toString() === selectedYear.toString()
          )?.[targetProperty];
          return (
            <GeoPath
              key={dp.properties.name}
              id={dp.id}
              data-country={dp.properties.name}
              d={path(dp)}
              fill={colorScale(property) || 'grey'}
            ></GeoPath>
          );
        })}
        <GeoInterior d={path(interiors)} />
      </g>
    </g>
  );
};

export default Data;
