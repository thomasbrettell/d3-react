import React from 'react';
import styled from 'styled-components';
import { Spinner } from '@geist-ui/react';
import Data from './Data';
import YearPicker from './YearPicker';
import { useState } from 'react/cjs/react.development';
import Tooltip from './Tooltip';

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

const Vis = ({ data, topology, interiors }) => {
  const [selectedYear, setSelectedYear] = useState('2020');
  const [tooltipData, setTooltipData] = useState(null);
  return (
    <>
      {!data && topology && interiors && (
        <LoadingOverlay>
          <Spinner />
        </LoadingOverlay>
      )}
      <svg width={width} height={height}>
        {data && topology && interiors && (
          <Data
            data={data}
            interiors={interiors}
            topology={topology}
            height={height}
            width={width}
            selectedYear={selectedYear}
            onHover={setTooltipData}
          />
        )}
      </svg>
      {data && topology && interiors && (
        <>
          <YearPicker
            data={data}
            value={selectedYear}
            onChange={setSelectedYear}
          />
          <Tooltip data={tooltipData} />
        </>
      )}
    </>
  );
};

export default Vis;
