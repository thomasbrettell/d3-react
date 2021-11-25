import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  padding: 10px;
  background-color: white;
  position: absolute;
  color: black;
  top: 0;
  left: 0;
  transform: translate(50%, -50%);
`;

const Tooltip = ({ data }) => {
  const { x, y, year, temp } = data;

  return (
    <Box
      id='tooltip'
      // style={{ transform: `translate(${x}px, ${y}px)` }}
      style={{ left: `${x + 10}px`, top: `${y}px` }}
      data-year={year}
    >
      Year: {year}
      <br />
      Temperature: {Math.round((temp + Number.EPSILON) * 100) / 100}°
    </Box>
  );
};

export default Tooltip;
