import React, { useState } from 'react';
import styled from 'styled-components';

const Point = styled.circle`
  fill: blue;

  ${(p) =>
    p.doping &&
    `
    fill: red;
  `}
`;

const Tooltip = styled.text`
  fill: white;
`;

const DataPoint = ({ xScale, yScale, dp }) => {
  const [showTooltip, setShowToolTip] = useState(false);
  return (
    <>
      <Point
        r='10'
        cx={xScale(dp.Year)}
        cy={yScale(dp.Seconds)}
        data-xvalue={dp.Year}
        data-yvalue={new Date(dp.Seconds * 1000)}
        className='dot'
        doping={dp.Doping}
        onMouseEnter={() => setShowToolTip(true)}
        onMouseLeave={() => setShowToolTip(false)}
      />
      {showTooltip && (
        <Tooltip
          data-year={dp.Year}
          x={xScale(dp.Year) + 15}
          y={yScale(dp.Seconds)}
          id='tooltip'
          dy='.32em'
        >
          {dp.Year}
        </Tooltip>
      )}
    </>
  );
};

export default DataPoint;
