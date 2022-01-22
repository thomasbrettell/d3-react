import React, { useState } from 'react';
import styled from 'styled-components';
import { Spinner } from '@geist-ui/react';
import Data from '../components/Data';
import NationSelect from './NationSelect';
import Legend from './Legend';
import { scaleOrdinal, schemeCategory10 } from 'd3';

const LoadingOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
`;

const width = 980;
const height = 550;

const Vis = ({ data }) => {
  const [selectedNations, setSelectedNations] = useState(['Australia']);
  const nationSelectHandler = (value) => {
    setSelectedNations((prevArr) => [...prevArr, value]);
  };
  const colors = scaleOrdinal(schemeCategory10);

  const removeItemHandler = (nation) => {
    setSelectedNations((prevArr) => prevArr.filter((el) => el !== nation));
  };

  return (
    <>
      {!data && (
        <LoadingOverlay>
          <Spinner />
        </LoadingOverlay>
      )}
      {data && <NationSelect options={data} onSelect={nationSelectHandler} />}
      <svg width={width} height={height}>
        {data && !!selectedNations.length && (
          <Data
            data={data}
            height={height}
            width={width}
            selectedNations={selectedNations}
            selectedYear={'2017'}
            colors={colors}
          />
        )}
      </svg>
      {data && !!selectedNations.length && (
        <Legend
          nations={selectedNations}
          colors={colors}
          onRemoveItem={removeItemHandler}
        />
      )}
    </>
  );
};

export default Vis;
