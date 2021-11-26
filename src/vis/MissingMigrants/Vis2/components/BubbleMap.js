import React, { useMemo } from 'react';
import styled from 'styled-components';
import { geoPath, geoNaturalEarth1, geoGraticule } from 'd3-geo';
import { scaleSqrt } from 'd3-scale';
import { max } from 'd3-array';

const GeoPath = styled.path`
  fill: white;
  stroke: none;
`;

const GeoInterior = styled.path`
  fill: none;
  stroke-width: 0.5;
  stroke: var(--color-primary);
`;

const GeoSphere = styled.path`
  fill: #ffffff0d;
  stroke: white;
  stroke-width: 0.5;
`;

const GeoGraticules = styled.path`
  stroke-width: 0.5;
  stroke: #ffffff17;
  fill: none;
`;

const graticules = geoGraticule();
const path = geoPath(geoNaturalEarth1());

const sizeVal = (dp) => dp['Total Number of Dead and Missing'];
const BubbleMap = ({ topology, interiors, migrantData, filteredData }) => {
  const sizeScale = useMemo(
    () =>
      scaleSqrt()
        .domain([0, max(migrantData, sizeVal)])
        .range([0, 15]),
    [migrantData]
  );

  return (
    <g>
      <Map topology={topology} interiors={interiors} />
      {filteredData.map((dp, i) => {
        const [x, y] = geoNaturalEarth1()([dp.lng, dp.lat]);
        return (
          <circle
            key={i}
            r={sizeScale(dp['Total Number of Dead and Missing'])}
            fill='rgba(255, 0, 0, 0.5)'
            cx={x}
            cy={y}
          />
        );
      })}
    </g>
  );
};

export default BubbleMap;

const Map = ({ topology, interiors }) => {
  return useMemo(() => {
    return (
      <>
        <GeoGraticules d={path(graticules())} />
        <GeoSphere d={path({ type: 'Sphere' })} />
        {topology.features.map((dp) => (
          <GeoPath key={dp.properties.name} id={dp.id} d={path(dp)}></GeoPath>
        ))}
        <GeoInterior d={path(interiors)} />
      </>
    );
  }, [interiors, topology]);
};
