import React, { useState, useCallback, useEffect } from 'react';
import { feature, mesh } from 'topojson-client';
import { geoPath, geoNaturalEarth1, geoGraticule } from 'd3-geo';
import styled from 'styled-components';
import useData from '../../hooks/useData';
import { csvParse } from 'd3-dsv';
import { scaleSqrt } from 'd3-scale';
import { max } from 'd3-array';

const VisBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

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

const PopulationPoint = styled.circle`
  fill: red;
  opacity: 0.45;
`;

const Vis6 = () => {
  const [topology, setTopology] = useState(null);
  const [interiors, setInteriors] = useState(null);
  const [population, setPopulation] = useState(null);

  const transformData = useCallback((countriesData) => {
    setTopology(feature(countriesData, countriesData.objects.countries));
    setInteriors(
      mesh(countriesData, countriesData.objects.countries, (a, b) => a !== b)
    );
  }, []);
  const { sendRequest } = useData(transformData);

  const transformPopulationData = useCallback((countriesData) => {
    setPopulation(
      csvParse(countriesData).map((dp) => {
        dp.lat = +dp.lat;
        dp.lng = +dp.lng;
        dp.population = +dp.population;
        return dp;
      })
    );
  }, []);
  const { sendRequest: requestPopulation } = useData(
    transformPopulationData,
    'text'
  );

  useEffect(() => {
    sendRequest({
      url: 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json',
    });
    requestPopulation({
      url: 'https://gist.githubusercontent.com/curran/13d30e855d48cdd6f22acdf0afe27286/raw/0635f14817ec634833bb904a47594cc2f5f9dbf8/worldcities_clean.csv',
    });
  }, [sendRequest, requestPopulation]);

  console.log(population);

  if (!topology || !interiors || !population) {
    return <p>Fetching data...</p>;
  }
  const graticules = geoGraticule();

  console.log(topology);
  console.log(interiors);

  const width = 960;
  const height = 500;

  const rVal = (dp) => dp.population;
  const rScale = scaleSqrt()
    .domain([0, max(population, rVal)])
    .range([0, 15]);

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
        {population.map((dp, i) => {
          const [x, y] = geoNaturalEarth1()([dp.lng, dp.lat]);
          return (
            <PopulationPoint
              key={i}
              cx={x}
              cy={y}
              r={rScale(dp.population)}
            ></PopulationPoint>
          );
        })}
      </svg>
    </VisBox>
  );
};

export default Vis6;
