import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  background-color: white;
  color: var(--color-primary);
  position: absolute;
  padding: 5px 10px;
  border-radius: 3px;
  transform: translate(0, -50%);
  transition: left 0.1 ease-in-out, top 0.1 ease-in-out;
`;

const Tooltip = ({ data }) => {
  const { x, y, name, percentage } = data;

  return (
    <Box style={{ left: x + 20, top: y }} id='tooltip' data-education={percentage}>
      {name}, Degrees: {percentage}%
    </Box>
  );
};

export default Tooltip;
