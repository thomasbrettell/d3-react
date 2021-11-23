import React from 'react';
import csvData from './data/iris-csv.txt';
import { csvParse } from 'd3-dsv';

const Vis4 = () => {
  const data = csvParse(csvData).map((dp) => {
    for (const prop in dp) {
      if (prop === 'species') {
        continue;
      }
      dp[prop] = +dp[prop];
    }
    return dp;
  });
  console.log(data);
  return <h1>Vis4</h1>;
};

export default Vis4;
