import React, { useEffect, useState, useCallback } from 'react';
import useData from '../../hooks/useData';
import styled from 'styled-components';
import VisBox from '../../components/VisBox';
import Vis from './components/Vis';

const H1 = styled.h1`
  text-align: center;
`;

const H2 = styled.h2`
  text-align: center;
`;

const Vis12 = () => {
  const fccEl = document.getElementById('fcc_test_suite_wrapper');
  fccEl.style.display = 'block';

  const [data, setData] = useState(null);

  const applyData = useCallback((data) => {
    setData(data);
  }, []);

  const { sendRequest } = useData(applyData);

  useEffect(() => {
    sendRequest({
      url: 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json',
    });
    return () => {
      fccEl.style.display = 'none';
    };
  }, [fccEl, sendRequest]);

  if (!data) {
    return <pre>Fetching data...</pre>;
  }

  return (
    <>
      <H1 id='title'>Movie sales</H1>
      <H2 id='description'>Top movie box office grossing by genre</H2>
      <VisBox>
        <Vis data={data} />
      </VisBox>
    </>
  );
};

export default Vis12;
