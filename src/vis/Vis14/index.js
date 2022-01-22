import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Fieldset, Divider } from '@geist-ui/react';
import Vis from './components/Vis';
import useData from '../../hooks/useData';
import { csvParse } from 'd3';

const PageWrapper = styled.div`
  padding-top: 50px;
`;

const VisWrapper = styled.div`
  position: relative;
`;

const FieldWrapper = styled.div`
  margin: auto;
  width: max-content;
`;

const Visualisation = () => {
  const [data, setData] = useState(null);
  const applyData = useCallback((data) => {
    setData(csvParse(data));
  }, []);
  const { sendRequest } = useData(applyData, 'text');
  useEffect(() => {
    sendRequest({
      url: 'https://gist.githubusercontent.com/thomasbrettell/6fec8abe95d596e4302048b4190102ee/raw/65611719978c5ff95df0446b8e658eac9940fd89/national-causes-of-death.csv',
    });
  }, [sendRequest]);

  return (
    <PageWrapper>
      <FieldWrapper>
        <Fieldset>
          <Fieldset.Content>
            <Fieldset.Title>Causes of Death per Nation</Fieldset.Title>
            <Fieldset.Subtitle>
              Percentage of deaths in a nation that were caused by a specific
              category
            </Fieldset.Subtitle>
          </Fieldset.Content>
          <Divider my={0} />
          <Fieldset.Content>
            <VisWrapper>
              <Vis data={data} />
            </VisWrapper>
          </Fieldset.Content>
          <Fieldset.Footer>
            <span>
              <a
                href='https://gist.githubusercontent.com/thomasbrettell/6fec8abe95d596e4302048b4190102ee/raw/65611719978c5ff95df0446b8e658eac9940fd89/national-causes-of-death.csv'
                target='_blank'
                rel='noreferrer'
              >
                Source
              </a>
            </span>
          </Fieldset.Footer>
        </Fieldset>
      </FieldWrapper>
    </PageWrapper>
  );
};

export default Visualisation;
