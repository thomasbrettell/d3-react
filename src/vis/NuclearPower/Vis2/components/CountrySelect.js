import React, { useState } from 'react';
import { AutoComplete } from '@geist-ui/react';
import styled from 'styled-components';

const Position = styled.div`
  top: 0;
  right: 0;
  position: absolute;
`;

const CountrySelect = ({ options, onChange, value }) => {
  const allOptions = options.map((option) => {
    return {
      label: option,
      value: option,
    };
  });
  const [filteredOptions, setFilteredOptions] = useState();

  const searchHandler = (currentValue) => {
    const relatedOptions = allOptions.filter((item) =>
      item.value.includes(currentValue)
    );
    setFilteredOptions(relatedOptions);
  };

  return (
    <Position>
      {/* <Select
        initialValue='Australia'
        value={value}
        onChange={(val) => onChange(val)}
      >
        {options.map((option) => (
          <Select.Option value={option} key={option}>
            {option}
          </Select.Option>
        ))}
      </Select> */}
      <AutoComplete
        disableFreeSolo
        options={filteredOptions}
        value={value}
        initialValue='Australia'
        onSearch={searchHandler}
        onSelect={onChange}
      />
    </Position>
  );
};

export default CountrySelect;
