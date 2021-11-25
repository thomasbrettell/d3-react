import React from 'react';
import styled from 'styled-components';

const Box = styled.rect`
  &:hover {
    stroke: var(--color-primary);
    stroke-width: 1;
  }
`;

const Cell = ({ dp, xScale, yScale, colourScale, onSetTooltip, baseTemp }) => {
  return (
    <Box
      className='cell'
      data-month={dp.month - 1}
      data-year={dp.year}
      data-temp={baseTemp + dp.variance}
      width={xScale.bandwidth()}
      height={yScale.bandwidth()}
      x={xScale(dp.year)}
      y={yScale(dp.month)}
      fill={colourScale(dp.variance)}
      onMouseOver={() =>
        onSetTooltip({
          x: xScale(dp.year),
          y: yScale(dp.month),
          temp: baseTemp + dp.variance,
          year: dp.year,
        })
      }
      onMouseOut={() => onSetTooltip(null)}
    />
  );
};

export default Cell;
