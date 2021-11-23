import { arc } from 'd3-shape';
import React from 'react';

const Mouth = ({radius, width}) => {
  const mouthArc = arc()
    .innerRadius(radius)
    .outerRadius(radius + width)
    .startAngle(Math.PI / 2)
    .endAngle((Math.PI * 3) / 2);

  return <path d={mouthArc()}></path>;
};

export default Mouth;
