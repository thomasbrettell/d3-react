import React from 'react';
import data from './data/public-opposition-to-nuclear-energy-production.json';
import { Fieldset, Divider } from '@geist-ui/react';
import styled from 'styled-components';
import Vis from './components/Vis';
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

const Vis1 = () => {
  console.log(orderedData);
  return (
    <PageWrapper>
      <FieldWrapper>
        <Fieldset>
          <Fieldset.Content>
            <Fieldset.Title>
              International opposition to the production of nuclear energy
            </Fieldset.Title>
            <Fieldset.Subtitle>
              This data was collected in 2011 after the Fukushima Daiichi
              nuclear disaster
            </Fieldset.Subtitle>
          </Fieldset.Content>
          <Divider my={0} />
          <Fieldset.Content>
            <VisWrapper>
              <Vis data={orderedData} />
            </VisWrapper>
          </Fieldset.Content>
          <Fieldset.Footer>
            <span>
              Source:{' '}
              <a
                href='https://www.ipsos.com/ipsos-mori/en-uk/strong-global-opposition-towards-nuclear-power'
                target='_blank'
                rel='noreferrer'
              >
                Ipsos MORI
              </a>
            </span>
          </Fieldset.Footer>
        </Fieldset>
      </FieldWrapper>
    </PageWrapper>
  );
};

export default Vis1;
