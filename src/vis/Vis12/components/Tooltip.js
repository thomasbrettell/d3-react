import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const portalEl = document.getElementById('portal');

const Box = styled.div`
  background: white;
  transform: translate(20px, -50%);
  position: absolute;
  color: black;
  padding: 10px;
  border-radius: 4px;
  font-size: 10px;
`;

const Tooltip = ({ data }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const onMouseMove = (e) => {
    setMousePos({
      x: e.clientX + window.scrollX,
      y: e.clientY + window.scrollY,
    });
  };

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
  }, []);

  if (!data) {
    return null;
  }

  return createPortal(
    <Box
      id='tooltip'
      data-value={data[0]}
      style={{ top: mousePos.y, left: mousePos.x }}
    >
      Name: {data[1]}
      <br />
      Category: {data[2]}
      <br />
      Value: {data[0]}
    </Box>,
    portalEl
  );
};

export default Tooltip;
