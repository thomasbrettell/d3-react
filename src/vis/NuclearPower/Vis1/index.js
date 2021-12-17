import React from 'react';
import data from './data/public-opposition-to-nuclear-energy-production.json';
import { scaleLinear, max } from 'd3';
import styled from 'styled-components';
const orderedData = data.sort((a, b) => {
  if (
    a['Opposed to nuclear energy (Ipsos MORI (2011))'] <
    b['Opposed to nuclear energy (Ipsos MORI (2011))']
  ) {
    return 1;
  }
  if (
    a['Opposed to nuclear energy (Ipsos MORI (2011))'] >
    b['Opposed to nuclear energy (Ipsos MORI (2011))']
  ) {
    return -1;
  }

  return 0;
});

const H1 = styled.h1`
  text-align: center;
`;

const P = styled.p`
  text-align: center;
`;

const Visbox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Reference = styled.p`
  font-size: 10px;
`;

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

const Vis1 = () => {
  const width = 980;
  const height = 450;
  const margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 130,
  };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xVal = (dp) => dp['Opposed to nuclear energy (Ipsos MORI (2011))'];
  const xScale = scaleLinear()
    .domain([0, max(orderedData, xVal)])
    .range([0, innerWidth]);
  console.log(orderedData);
  return (
    <>
      <H1>International opposition to the production of nuclear energy</H1>
      <P>
        This data was collected in 2011 after the Fukushima Daiichi nuclear
        disaster
      </P>
      <Visbox>
        <svg width={width} height={height}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            {orderedData.map((dp, i) => (
              <DPGroup transform={`translate(0, ${17 * i})`} key={i}>
                <text textAnchor='end' x='-10' dy='1.1em' fontSize='10px'>
                  {dp.Entity}
                </text>
                <RectDp
                  blue={dp.Entity === 'World'}
                  height={innerHeight / orderedData.length}
                  width={xScale(
                    dp['Opposed to nuclear energy (Ipsos MORI (2011))']
                  )}
                  data-entity={dp.Entity}
                />
                <text
                  textAnchor='start'
                  x={
                    xScale(
                      dp['Opposed to nuclear energy (Ipsos MORI (2011))']
                    ) + 4
                  }
                  dy='1.1em'
                  fontSize='10px'
                >
                  {dp['Opposed to nuclear energy (Ipsos MORI (2011))']}%
                </text>
              </DPGroup>
            ))}
          </g>
        </svg>
        <Reference className='reference'>
          Data from{' '}
          <a href='https://www.ipsos.com/ipsos-mori/en-uk/strong-global-opposition-towards-nuclear-power'>
            Ipsos MORI
          </a>
        </Reference>
      </Visbox>
    </>
  );
};

export default Vis1;
