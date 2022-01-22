import React, { useState } from 'react';
import { AutoComplete } from '@geist-ui/react';
import styled from 'styled-components';

const Position = styled.div`
  top: 0;
  left: 0;
  position: absolute;
`;

const NationSelect = ({ options, onSelect }) => {
  const allOptions = options.reduce((allOptions, option) => {
    if (!allOptions.find((opt) => opt.value === option.Country)) {
      allOptions.push({
        label: option.Country,
        value: option.Country,
      });
    }
    return allOptions;
  }, []);
  const [filteredOptions, setFilteredOptions] = useState();

  const searchHandler = (currentValue) => {
    const relatedOptions = allOptions.filter((item) =>
      item.value.includes(currentValue)
    );
    setFilteredOptions(relatedOptions);
  };

  return (
    <Position>
      <AutoComplete
        disableFreeSolo
        options={filteredOptions}
        // value={value}
        // initialValue='Australia'
        onSearch={searchHandler}
        onSelect={onSelect}
        placeholder='Search a nation'
      />
    </Position>
  );
};

export default NationSelect;
