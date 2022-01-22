import React from 'react';
import { Card, Button } from '@geist-ui/react';
import styled from 'styled-components';
import X from '@geist-ui/icons/x';

const LegendPosition = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
`;

const LI = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  justify-content: space-between;
`;

const Color = styled.div`
  height: 15px;
  width: 15px;
  margin-right: 5px;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const Legend = ({ nations, colors, onRemoveItem }) => {
  return (
    <LegendPosition>
      <Card>
        {nations.map((nation) => (
          <LI key={nation}>
            <Flex>
              <Color style={{ backgroundColor: colors(nation) }} />
              {nation}
            </Flex>
            <Button
              type='abort'
              iconRight={<X />}
              auto
              scale={1 / 2}
              px={0.3}
              ml='10px'
              onClick={() => onRemoveItem(nation)}
            />
          </LI>
        ))}
      </Card>
    </LegendPosition>
  );
};

export default Legend;
