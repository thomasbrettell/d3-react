import React from 'react';
import countriesData from './data/countries-50m.json';
import { feature, mesh } from 'topojson-client';
import { geoPath, geoNaturalEarth1, geoGraticule } from 'd3-geo';
import styled from 'styled-components';

const VisBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const GeoPath = styled.path`
  fill: white;
  stroke: none;

  &:hover {
    fill: red;
  }
`;

const GeoInterior = styled.path`
  fill: none;
  stroke-width: 0.5;
  stroke: var(--color-primary);
`;

const GeoSphere = styled.path`
  fill: none;
  stroke: white;
  stroke-width: 0.5;
`;

const GeoGraticules = styled.path`
  stroke-width: 0.5;
  stroke: #ffffff17;
  fill: none;
`;

const Vis6 = () => {
  const topology = feature(countriesData, countriesData.objects.countries);
  const interiors = mesh(
    countriesData,
    countriesData.objects.countries,
    (a, b) => a !== b
  );
  const graticules = geoGraticule();

  console.log(topology);
  console.log(interiors);

  const width = 960;
  const height = 500;

  return (
    <VisBox>
      <svg width={width} height={height}>
        <GeoGraticules d={geoPath(geoNaturalEarth1())(graticules())} />
        <GeoSphere d={geoPath(geoNaturalEarth1())({ type: 'Sphere' })} />
        {topology.features.map((dp) => (
          <GeoPath
            key={dp.properties.name}
            id={dp.id}
            d={geoPath(geoNaturalEarth1())(dp)}
          />
        ))}
        <GeoInterior d={geoPath(geoNaturalEarth1())(interiors)} />
      </svg>
    </VisBox>
  );
};

export default Vis6;
