import React, { useState, useMemo } from 'react';
import { hierarchy, treemap } from 'd3-hierarchy';
import { scaleOrdinal } from 'd3-scale';
import generateRandomRGB from '../util/generateRandomRGB';
import Tooltip from './Tooltip';
import styled from 'styled-components';

const PointLabel = styled.text`
  pointer-events: none;
`;

const Vis = (data) => {
  const [tooltipData, setTooltipData] = useState(null);
  const width = 1000;
  const height = 1100;

  const margin = {
    top: 0,
    right: 0,
    bottom: 100,
    left: 0,
  };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const root = useMemo(
    () => hierarchy(data.data).sum((d) => d.value),
    [data.data]
  );
  treemap().size([innerWidth, innerHeight]).padding(1)(root);

  const colorVal = (dp) => dp.data.category;
  const colorScale = useMemo(
    () =>
      scaleOrdinal()
        .domain(root.leaves().map(colorVal))
        .range(root.leaves().map(() => generateRandomRGB())),
    [root]
  );

  return (
    <>
      <svg width={width} height={height}>
        <g>
          {root.leaves().map((d, i) => (
            <g key={i} transform={`translate(${d.x0}, ${d.y0})`}>
              <rect
                className='tile'
                width={d.x1 - d.x0}
                height={d.y1 - d.y0}
                data-name={d.data.name}
                data-category={d.data.category}
                data-value={d.data.value}
                fill={colorScale(d.data.category)}
                onMouseEnter={() =>
                  setTooltipData([d.data.value, d.data.name, d.data.category])
                }
                onMouseOut={() => setTooltipData(null)}
              ></rect>
              <PointLabel fontSize='10'>
                {d.data.name.split(' ').map((word, u) => (
                  <tspan key={u + i} x='4' y={10 * (u + 1) + 3}>
                    {word}
                  </tspan>
                ))}
              </PointLabel>
            </g>
          ))}
          <g transform={`translate(0, ${innerHeight + 20})`} id='legend'>
            {colorScale.domain().map((color, i) => (
              <g key={color} transform={`translate(${(i + 1) * 100}, 0)`}>
                <rect
                  fill={colorScale(color)}
                  height='10'
                  width='10'
                  className='legend-item'
                />
                <text dy='.32em' fill='white' textAnchor='middle' y='1.3em'>
                  {color}
                </text>
              </g>
            ))}
          </g>
        </g>
      </svg>
      <Tooltip data={tooltipData} />
    </>
  );
};

export default Vis;
