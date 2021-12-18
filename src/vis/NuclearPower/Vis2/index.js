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
            <Fieldset.Title>
              International energy consumption from different sources
            </Fieldset.Title>
            <Fieldset.Subtitle>
              The bars show how many terawatts-per-hour are generated in the
              selected country for each source of energy
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
              Source:{' '}
              <a
                href='https://ourworldindata.org/energy/country/australia?country=AUS~AFG~ALB~DZA~ASM~AND~AGO~AIA~ATG~ARG~ARM~ABW~AUT~AZE~BHS~BHR~BGD~BRB~BLR~BEL~BLZ~BEN~BMU~BOL~BTN~BIH~BWA~BRA~VGB~BRN~BGR~BFA~BDI~KHM~CMR~CAN~CPV~CYM~CAF~TCD~CHL~CHN~CXR~COL~COM~COG~CRI~CIV~HRV~CUB~CYP~COD~CZE~DNK~DJI~DMA~DOM~ECU~EGY~GNQ~SLV~ERI~EST~SWZ~ETH~FRO~FLK~FJI~FIN~FRA~GUF~PYF~GAB~GMB~GEO~DEU~GHA~GIB~GRC~GRD~GRL~GUM~GIN~GTM~GNB~GUY~HTI~HND~HKG~HUN~ISL~IND~IDN~IRN~IRQ~IRL~IMN~ISR~ITA~JAM~JPN~JEY~JOR~KAZ~KEN~KIR~KWT~KGZ~LAO~LVA~LBN~LSO~LBR~LIE~LBY~LTU~LUX~MAC~MDG~MWI~MYS~MDV~MLI~MLT~MHL~MTQ~MRT~MUS~MYT~MEX~MDA~FSM~MCO~MNG~MNE~MOZ~MAR~MMR~NAM~NRU~NPL~NLD~NCL~NZL~NIC~NER~NGA~NIU~NFK~PRK~MKD~MNP~NOR~OMN~PAK~PLW~PAN~PSE~PNG~PRY~PER~PHL~PCN~POL~PRT~PRI~QAT~REU~ROU~RUS~RWA~BLM~KNA~LCA~SPM~VCT~WSM~SMR~STP~SAU~SEN~SRB~SYC~SLE~SGP~SVK~SVN~SLB~SOM~ZAF~KOR~SSD~ESP~LKA~SUR~SDN~SWE~SYR~CHE~TJK~TWN~TZA~THA~TLS~TGO~TKL~TON~TTO~TUN~TUR~TKM~TCA~TUV~UGA~UKR~ARE~GBR~USA~VIR~URY~UZB~VUT~VAT~VEN~VNM~YEM~ZMB~ZWE~OWID_WRL'
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

export default Vis2;
