import React from 'react';
import { scaleBand } from 'd3';

const Data = ({ selectedCountry, data, height, width }) => {
  const margin = {
    top: 0,
    right: 0,
    bottom: 60,
    left: 0,
  };
  // const innerWidth = width - margin.left - margin.right;
  // const innerHeight = height - margin.top - margin.bottom;

  const countryData = data[selectedCountry]
  console.log(countryData)

  // const bandVal = (dp) => {
  //   if(dp)
  // }
  // const bandScale = scaleBand().domain(countryData.filter(dp => {

  // }))
  // console.log(bandScale.domain());
  return <g transform={`translate(${margin.left}, ${margin.top})`}></g>;
};

export default Data;
