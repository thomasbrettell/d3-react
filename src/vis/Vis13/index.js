import React, { useState, useCallback, useEffect } from 'react';
import { Fieldset, Divider } from '@geist-ui/react';
import styled from 'styled-components';
import useData from '../../hooks/useData';
import Vis from './components/Vis';
import { feature, mesh } from 'topojson-client';

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

const excludeList = [
  'World',
  'Asia (excl. China & India)',
  'Asia',
  'Europe',
  'Europe (excl. EU-27)',
  'EU-28',
  'EU-27',
];

const Vis13 = () => {
  const [data, setData] = useState(null);
  const [topology, setTopology] = useState(null);
  const [interiors, setInteriors] = useState(null);
  const applyData = useCallback((data) => {
    for (const p in data) {
      if (excludeList.includes(p) || !data[p].iso_code) {
        delete data[p];
      } else if (p === 'United States') {
        data['United States of America'] = data[p];
        delete data[p];
      }
    }
    setData(data);
  }, []);
  const { sendRequest } = useData(applyData);

  const applyGeoData = useCallback((data) => {
    setTopology(feature(data, data.objects.countries));
    setInteriors(mesh(data, data.objects.countries, (a, b) => a !== b));
  }, []);
  const { sendRequest: requestGeoData } = useData(applyGeoData);

  useEffect(() => {
    requestGeoData({
      url: 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json',
    });
    sendRequest({
      url: 'https://raw.githubusercontent.com/owid/co2-data/master/owid-co2-data.json',
    });
  }, [sendRequest, requestGeoData]);

  console.log(data);

  return (
    <PageWrapper>
      <FieldWrapper>
        <Fieldset>
          <Fieldset.Content>
            <Fieldset.Title>World Wide population, 1750 - 2020</Fieldset.Title>
          </Fieldset.Content>
          <Divider my={0} />
          <Fieldset.Content>
            <VisWrapper>
              <Vis data={data} topology={topology} interiors={interiors} />
            </VisWrapper>
          </Fieldset.Content>
          <Fieldset.Footer>
            <span>
              Source:{' '}
              <a
                href='https://github.com/owid/co2-data'
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

export default Vis13;
