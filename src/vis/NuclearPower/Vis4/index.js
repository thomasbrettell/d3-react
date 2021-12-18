import React from 'react';
import { Fieldset, Divider } from '@geist-ui/react';
import styled from 'styled-components';

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

const Vis4 = () => {
  return (
    <PageWrapper>
      <FieldWrapper>
        <Fieldset>
          <Fieldset.Content>
            <Fieldset.Title>
              Comparing C02 emissions, deaths and global share of energy for
              different sources of energy
            </Fieldset.Title>
          </Fieldset.Content>
          <Divider my={0} />
          <Fieldset.Content>
            <VisWrapper>
              {/* <Vis data={data} /> */}
            </VisWrapper>
          </Fieldset.Content>
          <Fieldset.Footer>
            <span>
              Source:{' '}
              <a
                href='https://ourworldindata.org/safest-sources-of-energy'
                target='_blank'
                rel='noreferrer'
              >
                Our World in Data
              </a>
            </span>
          </Fieldset.Footer>
        </Fieldset>
      </FieldWrapper>
    </PageWrapper>
  );
};

export default Vis4;
