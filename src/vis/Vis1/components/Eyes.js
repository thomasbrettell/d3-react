import React from 'react';

const Eyes = ({ xOffSet, yOffset, radius }) => {
  return <circle cx={xOffSet} cy={yOffset} r={radius} />;
};

export default Eyes;
