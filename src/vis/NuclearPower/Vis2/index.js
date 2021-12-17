import React, { useCallback, useEffect, useState } from 'react';
import useData from '../../../hooks/useData';
import { Fieldset, Divider } from '@geist-ui/react';
import styled from 'styled-components';
import Vis from './components/Vis';

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

const Vis2 = () => {
  const [data, setData] = useState(null);
  const applyData = useCallback((data) => setData(data), []);
  const { sendRequest } = useData(applyData);

  useEffect(() => {
    sendRequest({
      url: 'https://gist.githubusercontent.com/thomasbrettell/486753411816d7b78bf965c8a8643dc2/raw/fd0e7c240759191732aa7c45876a3e9b9f380cda/country-energy-sources.json',
    });
  }, [sendRequest]);

  return (
    <PageWrapper>
      <FieldWrapper>
        <Fieldset>
          <Fieldset.Content>
            <Fieldset.Title>Vis title</Fieldset.Title>
            <Fieldset.Subtitle>Vis description</Fieldset.Subtitle>
          </Fieldset.Content>
          <Divider my={0} />
          <Fieldset.Content>
            <VisWrapper>
              <Vis data={data} />
            </VisWrapper>
          </Fieldset.Content>
          <Fieldset.Footer>Source: Our World in Data</Fieldset.Footer>
        </Fieldset>
      </FieldWrapper>
    </PageWrapper>
  );
};

export default Vis2;
