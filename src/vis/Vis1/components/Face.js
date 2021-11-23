import React from 'react';
import Eyes from './Eyes';
// import Blush from './Blush';
import Mouth from './Mouth';
import FaceBackground from './FaceBackground';

const Face = ({
  width,
  height,
  centerX,
  centerY,
  eyeOffSetX,
  eyeOffSetY,
  eyeRadius,
  mouthWidth,
  mouthRadius,
  // blushOffsetX,
  // blushOffsetY,
  strokeWidth,
  fill
}) => {
  return (
    <>
      <svg width={width} height={height}>
        <g transform={`translate(${centerX}, ${centerY})`}>
          <FaceBackground yCenter={centerY} strokeWidth={strokeWidth} fill={fill}/>
          <Eyes
            xOffSet={-eyeOffSetX}
            yOffset={-eyeOffSetY}
            radius={eyeRadius}
          />
          <Eyes xOffSet={eyeOffSetX} yOffset={-eyeOffSetY} radius={eyeRadius} />
          {/* <Blush xOffSet={-blushOffsetX} yOffSet={-blushOffsetY} /> */}
          {/* <Blush xOffSet={blushOffsetX} yOffSet={-blushOffsetY} /> */}
          <Mouth width={mouthWidth} radius={mouthRadius} />
        </g>
      </svg>
    </>
  );
};

export default Face;
