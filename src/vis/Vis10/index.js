import React from 'react';
import { arc } from 'd3-shape';
import { pie } from 'd3-shape';
import VisBox from '../../components/VisBox';
import styled from 'styled-components';

const Vis = styled.div`
  border-radius: 9999px;
  overflow: hidden;
  background-color: white;
  margin-top: 60px;
  display: flex;
`;

const Wedge = styled.g`
  path {
    fill: none;
    stroke: black;

    ${(p) =>
      p.am &&
      `
      fill: #ff00006b;
    `}

    ${(p) =>
      p.pm &&
      `
      fill: #0000ff42;
    `}
  }

  text {
    text-anchor: middle;
    fill: black;
  }
`;

const Vis10 = () => {
  const time = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const data = time.concat(time);
  const width = 500;
  const height = 500;
  const centerX = width / 2;
  const centerY = height / 2;
  const pieArc = arc().innerRadius(0).outerRadius(width);
  const arcLabel = arc()
    .innerRadius(0 * 0.2 + (width / 2) * 0.8)
    .outerRadius(0 * 0.2 + (width / 2) * 0.8);
  const arcLabelSecondary = arc()
    .innerRadius(0 * 0.2 + (width / 3) * 0.8)
    .outerRadius(0 * 0.2 + (width / 3) * 0.8);

  return (
    <VisBox>
      <Vis>
        <svg width={width} height={height}>
          <g transform={`translate(${centerX}, ${centerY})`}>
            {pie()
              .value(1)(data)
              .map((el, i) => (
                <Wedge
                  key={`${el.data}-${i}`}
                  am={i < data.length / 2}
                  pm={i >= data.length / 2}
                >
                  <path d={pieArc(el)} data-time={el.data}></path>
                  <text transform={`translate(${arcLabel.centroid(el)})`}>
                    {`${el.data}${i < data.length / 2 ? 'am' : 'pm'}`}
                  </text>
                  <text
                    fontSize={'.75rem'}
                    transform={`translate(${arcLabelSecondary.centroid(el)})`}
                  >
                    {i}
                  </text>
                </Wedge>
              ))}
          </g>
        </svg>
      </Vis>
    </VisBox>
  );
};

export default Vis10;
