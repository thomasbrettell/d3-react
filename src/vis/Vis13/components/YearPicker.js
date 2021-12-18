import React, { useMemo } from 'react';
import { Slider } from '@geist-ui/react';
import { extent } from 'd3';
import styled from 'styled-components';

const Box = styled.div`
  margin: 0 40px;
`;

const minMaxVal = (dp) => dp.year;

const YearPicker = ({ data, onChange, value }) => {
  const flatData = useMemo(
    () => Object.keys(data).flatMap((dp) => data[dp].data),
    [data]
  );
  const minMax = useMemo(() => extent(flatData, minMaxVal), [flatData]);
  const changeHandler = (val) => onChange(val);

  return (
    <Box>
      <Slider
        value={value}
        min={minMax[0]}
        max={minMax[1]}
        initialValue='2000'
        onChange={changeHandler}
      />
    </Box>
  );
};

export default YearPicker;
