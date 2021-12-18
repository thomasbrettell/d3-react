import React from 'react';
import styled from 'styled-components';
import { scaleLinear, max } from 'd3';

const RectDp = styled.rect`
  fill: white;

  ${(p) =>
    p.blue &&
    `
    fill: red;
  `}
`;

const DPGroup = styled.g`
  text {
    fill: white;
  }
`;

const Data = ({ data, height, width }) => {
  const margin = {
    top: 0,
    right: 30,
    bottom: 0,
    left: 90,
  };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xVal = (dp) => dp['Opposed to nuclear energy (Ipsos MORI (2011))'];
  const xScale = scaleLinear()
    .domain([0, max(data, xVal)])
    .range([0, innerWidth]);
  console.log(data);

  return (
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      {data.map((dp, i) => (
        <DPGroup
          transform={`translate(0, ${(innerHeight / data.length) * i})`}
          key={i}
        >
          <text textAnchor='end' x='-10' dy='1.1em' fontSize='10px'>
            {dp.Entity}
          </text>
          <RectDp
            blue={dp.Entity === 'World'}
            height={innerHeight / data.length - 1}
            width={xScale(dp['Opposed to nuclear energy (Ipsos MORI (2011))'])}
            data-entity={dp.Entity}
          />
          <text
            textAnchor='start'
            x={xScale(dp['Opposed to nuclear energy (Ipsos MORI (2011))']) + 4}
            dy='1.1em'
            fontSize='10px'
          >
            {dp['Opposed to nuclear energy (Ipsos MORI (2011))']}%
          </text>
        </DPGroup>
      ))}
    </g>
  );
};

export default Data;
