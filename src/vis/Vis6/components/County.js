import React from 'react';
import styled from 'styled-components';

const GeoPathCounties = styled.path`
  stroke: none;
`;

const County = ({ county, d, fill, onHover }) => {
  const { area_name, fips, bachelorsOrHigher } = county;
  return (
    <GeoPathCounties
      d={d}
      className='county'
      data-fips={fips}
      data-education={bachelorsOrHigher}
      data-county={area_name}
      fill={fill}
      onMouseEnter={(e) => {
        console.log(e);
        onHover({
          name: area_name,
          percentage: bachelorsOrHigher,
          x: e.clientX,
          y: e.clientY,
        });
      }}
      onMouseLeave={() => onHover(null)}
    />
  );
};

export default County;
