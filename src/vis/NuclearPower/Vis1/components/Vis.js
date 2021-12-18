import React from 'react';
import styled from 'styled-components';
import { Spinner } from '@geist-ui/react';
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
  return (
    <>
      {!data && (
        <LoadingOverlay>
          <Spinner />
        </LoadingOverlay>
      )}
      <svg width={width} height={height}>
        {data && <Data data={data} height={height} width={width} />}
      </svg>
    </>
  );
};

export default Vis;
