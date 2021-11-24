import React, { useState, useCallback, useEffect } from 'react';
import { feature, mesh } from 'topojson-client';
import { geoPath, geoNaturalEarth1, geoGraticule } from 'd3-geo';
import styled from 'styled-components';
import useData from '../../hooks/useData';

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
  fill: #ffffff0d;
  stroke: white;
  stroke-width: 0.5;
`;

const GeoGraticules = styled.path`
  stroke-width: 0.5;
  stroke: #ffffff17;
  fill: none;
`;

const Vis6 = () => {
  const [topology, setTopology] = useState(null);
  const [interiors, setInteriors] = useState(null);

  const transformData = useCallback((countriesData) => {
    setTopology(feature(countriesData, countriesData.objects.countries));
    setInteriors(
      mesh(countriesData, countriesData.objects.countries, (a, b) => a !== b)
    );
  }, []);
  const { sendRequest } = useData(transformData);

  useEffect(() => {
    sendRequest({
      url: 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json',
    });
  }, [sendRequest]);

  if (!topology || !interiors) {
    return <p>Fetching data...</p>;
  }
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
