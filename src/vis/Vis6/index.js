import React, { useState, useCallback, useEffect } from 'react';
import { feature } from 'topojson-client';
import styled from 'styled-components';
import useData from '../../hooks/useData';
import Svg from './components/Svg';
import Tooltip from './components/Tooltip';

const H1 = styled.h1`
  text-align: center;
`;

const H2 = styled.h2`
  text-align: center;
`;

const VisBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const Wrapper = styled.div`
  position: relative;
`;

const Vis = () => {
  const [counties, setCounties] = useState(null);
  const [states, setStates] = useState(null);
  const [data, setData] = useState(null);
  const [tooltipData, setTooltipData] = useState(null);

  const transformGeoData = useCallback((countriesData) => {
    setCounties(feature(countriesData, countriesData.objects.counties));
    setStates(feature(countriesData, countriesData.objects.states));
  }, []);
  const { sendRequest } = useData(transformGeoData);

  const transformData = useCallback((data) => {
    setData(data);
  }, []);
  const { sendRequest: requestionEducationData } = useData(transformData);

  useEffect(() => {
    const fccEl = document.getElementById('fcc_test_suite_wrapper');
    fccEl.style.display = 'block';
    sendRequest({
      url: 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json',
    });
    requestionEducationData({
      url: 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json',
    });
    return () => {
      fccEl.style.display = 'none';
    };
  }, [sendRequest, requestionEducationData]);

  if (!counties || !states || !data) {
    return <p>Fetching data...</p>;
  }

  console.log(data)

  return (
    <>
      <H1 id='title'>United States Degree Attainment</H1>
      <H2 id='description'>
        Percentage of adults age 25 and older with a bachelor&#8217;s degree or
        higher (2010-2014)
      </H2>
      <VisBox>
        <Wrapper>
          <Svg
            states={states}
            counties={counties}
            data={data}
            setTooltipData={setTooltipData}
          />
        </Wrapper>
      </VisBox>
      {tooltipData && <Tooltip data={tooltipData} />}
    </>
  );
};

export default Vis;
