import React from 'react';
import Face from './components/Face';
import { range } from 'd3-array';
import styled from 'styled-components';

const VixBox = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Vis1 = () => {
  const width = 166;
  const height = 166;

  const arr = range(50);

  return (
    <VixBox>
      {arr.map((el, i) => (
        <Face
          key={i}
          width={width}
          height={height}
          centerX={width / 2}
          centerY={height / 2}
          strokeWidth={10}
          eyeOffSetX={25}
          eyeOffSetY={25}
          eyeRadius={5 + Math.random() * 20}
          mouthWidth={5}
          mouthRadius={10 + Math.random() * 50}
          blushOffsetX={90}
          blushOffsetY={0}
          fill={`rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
            Math.random() * 255
          })`}
        />
      ))}
    </VixBox>
  );
};

export default Vis1;
