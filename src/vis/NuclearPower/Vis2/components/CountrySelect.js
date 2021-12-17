import React from 'react';
import { Select } from '@geist-ui/react';
import styled from 'styled-components';

const Position = styled.div`
  top: 0;
  right: 0;
  position: absolute;
`;

const CountrySelect = ({ options, onChange, value }) => {
  return (
    <Position>
      <Select
        initialValue='Australia'
        value={value}
        onChange={(val) => onChange(val)}
      >
        {options.map((option) => (
          <Select.Option value={option} key={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
    </Position>
  );
};

export default CountrySelect;
