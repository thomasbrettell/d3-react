import React, { useEffect, useState, useCallback } from 'react';
import useData from '../../../hooks/useData';
import { csvParse } from 'd3-dsv';
import Vis from './components/Vis';
import VisBox from '../../../components/VisBox';
import styled from 'styled-components';

const H1 = styled.h1`
  text-align: center;
`;

const Vis3 = () => {
  const [data, setData] = useState(null);
  const applyData = useCallback((data) => {
    setData(
      csvParse(data).map((dp) => {
        dp['Total Number of Dead and Missing'] =
          +dp['Total Number of Dead and Missing'];
        dp['Incident Date'] = new Date(dp['Incident Date'].split(' ')[1]);
        return dp;
      })
    );
  }, []);
  const { sendRequest } = useData(applyData, 'text');

  useEffect(() => {
    sendRequest({
      url: 'https://gist.githubusercontent.com/thomasbrettell/06b3d87bf21c62b691da3e61b17d8c8f/raw/755de9be012607d9241781e14a4176c90cb5fcf6/missing-migrants-nov2021-2014-transformed.csv',
    });
  }, [sendRequest]);

  if (!data) {
    return <p>Fetching data...</p>;
  }

  console.log(data);
  return (
    <>
      <H1>Dead or Missing Migrants 2014-2022</H1>
      <VisBox>
        <Vis data={data} />
      </VisBox>
    </>
  );
};

export default Vis3;
