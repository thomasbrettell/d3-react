import React, { useEffect, useState, useCallback } from 'react';
import useData from '../../hooks/useData';
import styled from 'styled-components';
import VisBox from '../../components/VisBox';
import Tooltip from './components/Tooltip';
import Visualisation from './components/Visualisation';

const H1 = styled.h1`
  text-align: center;
`;

const H2 = styled.h2`
  text-align: center;
`;

const Vis11 = () => {
  const fccEl = document.getElementById('fcc_test_suite_wrapper');
  fccEl.style.display = 'block';

  const [tooltipData, setTooltipData] = useState(null);

  const [data, setData] = useState(null);
  const transformData = useCallback((data) => {
    setData(data);
  }, []);
  const { sendRequest } = useData(transformData);

  useEffect(() => {
    sendRequest({
      url: 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json',
    });
    return () => {
      fccEl.style.display = 'none';
    };
  }, [sendRequest, fccEl]);

  if (!data) {
    return <p>Fetching data...</p>;
  }

  return (
    <>
      <H1 id='title'>Monthly Land Surface Temperature</H1>
      <H2 id='description'>1753-2015: base temperature {data.baseTemperature}</H2>
      <VisBox>
        <Visualisation data={data} onSetTooltip={setTooltipData}/>
        {tooltipData && <Tooltip data={tooltipData} />}
      </VisBox>
    </>
  );
};

export default Vis11;
