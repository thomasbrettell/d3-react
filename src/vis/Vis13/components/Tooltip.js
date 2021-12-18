import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { Card, Divider, Text } from '@geist-ui/react';

const portalEl = document.getElementById('portal');

const Box = styled.div`
  transform: translate(20px, -50%);
  position: absolute;
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
    return () => setMousePos({ x: 0, y: 0 });
  }, []);

  if (!data) {
    return null;
  }

  return createPortal(
    <Box style={{ top: mousePos.y, left: mousePos.x }}>
      <Card>
        <Card.Content padding='10px'>
          <Text b>{data.country}</Text>
        </Card.Content>
        <Divider my={0} />
        <Card.Content padding='10px'>
          <Text>{data.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
        </Card.Content>
      </Card>
    </Box>,
    portalEl
  );
};

export default Tooltip;
