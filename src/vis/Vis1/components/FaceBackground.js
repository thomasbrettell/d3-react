import React from 'react';

const FaceBackground = ({ yCenter, strokeWidth, fill = 'yellow' }) => {
  return (
    <circle
      r={yCenter - strokeWidth / 2}
      fill={fill}
      stroke='black'
      strokeWidth={strokeWidth}
    />
  );
};

export default FaceBackground;
