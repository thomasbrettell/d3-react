import React, { useCallback, useEffect, useState } from 'react';
import useData from '../../../hooks/useData';
import { feature, mesh } from 'topojson-client';
import VisBox from '../../../components/VisBox';
import Vis from './components/Vis';
import styled from 'styled-components';
import { csvParse } from 'd3-dsv';

const H1 = styled.h1`
  text-align: center;
`;

const NewVisBox = styled(VisBox)`
  margin-top: 20px;
`;

const Vis2 = () => {
  const [topology, setTopology] = useState(null);
  const [interiors, setInteriors] = useState(null);
  const [migrantData, setMigrantData] = useState(null);

  const applyGeoData = useCallback((data) => {
    setTopology(feature(data, data.objects.countries));
    setInteriors(mesh(data, data.objects.countries, (a, b) => a !== b));
  }, []);
  const { sendRequest: requestGeoData } = useData(applyGeoData);

  const applyMigrantData = useCallback((data) => {
    console.log(data);
    setMigrantData(
      csvParse(data).reduce((newArr, dp) => {
        // if (!dp.Coordinates) return newArr;
        // dp['Total Number of Dead and Missing'] =
        //   +dp['Total Number of Dead and Missing'];
        dp['Total Number of Dead and Missing'] = +dp['Total Dead and Missing'];
        // const [lat, lng] = dp.Coordinates.split(',');
        const [lat, lng] = dp['Location Coordinates'].split(',');
        if (lat && lng) {
          dp.lat = +lat;
          dp.lng = +lng;
        }
        // dp['Incident Date'] = new Date(dp['Incident Date'].split(' ')[1]);
        dp['Incident Date'] = new Date(dp['Reported Date']);
        delete dp.Coordinates;
        newArr.push(dp);
        return newArr;
      }, [])
    );
  }, []);
  const { sendRequest: requestMigrantData } = useData(applyMigrantData, 'text');

  useEffect(() => {
    requestGeoData({
      url: 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json',
    });
    requestMigrantData({
      url: 'https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/c22144062566de911ba32509613c84af2a99e8e2/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv',
      // url: 'https://gist.githubusercontent.com/thomasbrettell/06b3d87bf21c62b691da3e61b17d8c8f/raw/755de9be012607d9241781e14a4176c90cb5fcf6/missing-migrants-nov2021-2014-transformed.csv',
    });
  }, [requestGeoData, requestMigrantData]);

  if (!topology || !interiors || !migrantData) {
    return <p>Fetching data...</p>;
  }

  console.log(migrantData);

  return (
    <>
      <H1>Dead or Missing Migrants Mapped Geographically</H1>
      <NewVisBox>
        <Vis
          topology={topology}
          interiors={interiors}
          migrantData={migrantData}
        />
      </NewVisBox>
    </>
  );
};

export default Vis2;
