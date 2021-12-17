import React, {useState} from 'react';
import styled from 'styled-components';
import { Spinner } from '@geist-ui/react';
import CountrySelect from './CountrySelect';
import Data from './Data';

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
const height = 450;

const Vis = ({ data }) => {
  const [selectedCountry, setSelectedCountry] = useState('Australia');

  return (
    <>
      {!data && (
        <LoadingOverlay>
          <Spinner />
        </LoadingOverlay>
      )}
      {data && (
        <CountrySelect
          options={Object.keys(data)}
          value={selectedCountry}
          onChange={setSelectedCountry}
        />
      )}
      <svg width={width} height={height}>
        {data && (
          <Data
            selectedCountry={selectedCountry}
            data={data}
            height={height}
            width={width}
          />
        )}
      </svg>
    </>
  );
};

export default Vis;
