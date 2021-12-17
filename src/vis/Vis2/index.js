import csvData from './data/css named colours - Sheet1.txt';
import React from 'react';
import { csvParse } from 'd3-dsv';
import { arc } from 'd3-shape';
import { pie } from 'd3-shape';
import styled from 'styled-components';

const Center = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PieWrapper = styled.div`
  border-radius: 9999px;
  overflow: hidden;
  display: inline-flex;
`;

const Vis2 = () => {
  const data = csvParse(csvData);
  const width = 400;
  const height = 400;
  const centerX = width / 2;
  const centerY = height / 2;
  const pieArc = arc().innerRadius(0).outerRadius(width);
  console.log(data);

  return (
    <Center>
      <PieWrapper>
        <svg width={width} height={height}>
          <g transform={`translate(${centerX}, ${centerY})`}>
            {pie()
              .value(1)(data)
              .map((el) => (
                <path
                  key={el.data.Keyword}
                  fill={el.data.hexValue}
                  d={pieArc(el)}
                />
              ))}
          </g>
        </svg>
      </PieWrapper>
    </Center>
  );
};

export default Vis2;
