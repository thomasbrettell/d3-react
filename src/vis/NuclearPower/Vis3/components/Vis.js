import React, { useState } from 'react';
import styled from 'styled-components';
import { Spinner } from '@geist-ui/react';
import Data from './Data';
import { Radio, Card } from '@geist-ui/react';

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

const Information = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 10px;
  max-width: 300px;
`;

const width = 980;
const height = 450;

const options = [
  { value: 'global_energy_share', label: 'Global energy share as %' },
  { value: 'deaths_per_twh', label: 'Deaths per TWh' },
  { value: 'co2_tonnes_per_gwh', label: 'Tonnes of c02 per GWh' },
];

const Vis = ({ data }) => {
  const [selectedProperty, setSelectedProperty] =
    useState('global_energy_share');
  return (
    <>
      {!data && (
        <LoadingOverlay>
          <Spinner />
        </LoadingOverlay>
      )}
      {data && (
        <Radio.Group
          value={selectedProperty}
          useRow
          onChange={(val) => setSelectedProperty(val)}
        >
          {options.map((dp) => (
            <Radio key={dp.value} value={dp.value}>
              {dp.label}
            </Radio>
          ))}
        </Radio.Group>
      )}
      {selectedProperty === 'deaths_per_twh' && (
        <Information>
          <Card>
            Deaths include those from accidents such as Chernobyl and
            Sayano-Shushenskaya as well as premature deaths as a result of air
            pollution (this includes radiation pollution).
          </Card>
        </Information>
      )}
      <svg width={width} height={height}>
        {data && (
          <Data
            data={data}
            height={height}
            width={width}
            selectedProperty={selectedProperty}
          />
        )}
      </svg>
    </>
  );
};

export default Vis;
