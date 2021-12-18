import React, { useEffect, useState, useMemo } from 'react';
import { arc } from 'd3-shape';
import { pie } from 'd3-shape';
import VisBox from '../../components/VisBox';
import styled from 'styled-components';

const Vis = styled.div`
  border-radius: 9999px;
  overflow: hidden;
  background-color: white;
  margin-top: 60px;
  display: flex;
`;

const TimeHand = styled.line`
  stroke: white;
  stroke-width: 2;
`;

const Wedge = styled.g`
  path {
    fill: none;
    stroke: black;

    ${(p) =>
      p.am &&
      `
      fill: #ff00006b;
    `}

    ${(p) =>
      p.pm &&
      `
      fill: #0000ff42;
    `}
  }

  text {
    text-anchor: middle;
    fill: black;
  }
`;

const Vis10 = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const time = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const data = time.concat(time);
  const width = 500;
  const height = 500;
  const centerX = width / 2;
  const centerY = height / 2;
  const pieArc = arc().innerRadius(0).outerRadius(width);
  const arcLabel = arc()
    .innerRadius(0 * 0.2 + (width / 2) * 0.8)
    .outerRadius(0 * 0.2 + (width / 2) * 0.8);
  const arcLabelSecondary = arc()
    .innerRadius(0 * 0.2 + (width / 3) * 0.8)
    .outerRadius(0 * 0.2 + (width / 3) * 0.8);

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  console.log(hours, minutes, seconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <VisBox>
      <Vis>
        <svg width={width} height={height}>
          {useMemo(
            () => (
              <g transform={`translate(${centerX}, ${centerY})`}>
                {pie()
                  .value(1)(data)
                  .map((el, i) => (
                    <Wedge
                      key={`${el.data}-${i}`}
                      am={i < data.length / 2}
                      pm={i >= data.length / 2}
                    >
                      <path d={pieArc(el)} data-time={el.data}></path>
                      <text transform={`translate(${arcLabel.centroid(el)})`}>
                        {`${el.data}${i < data.length / 2 ? 'am' : 'pm'}`}
                      </text>
                      <text
                        fontSize={'.75rem'}
                        transform={`translate(${arcLabelSecondary.centroid(
                          el
                        )})`}
                      >
                        {i}
                      </text>
                    </Wedge>
                  ))}
              </g>
            ),
            [arcLabel, arcLabelSecondary, centerY, centerX, data, pieArc]
          )}

          <g transform={`translate(${centerX}, ${centerY})`}>
            <TimeHand
              y2={-(centerY / 2)}
              y1='38'
              transform={`rotate(${14 * hours + minutes / 2 + 7.5})`}
            />

            {/* <TimeHand
              y2={-(centerY / 0.5)}
              y1='38'
              transform={`rotate(${6 * minutes + seconds / 10})`}
            /> */}

            <TimeHand
              y2={-(centerY - 50)}
              y1='38'
              transform={`rotate(${6 * seconds})`}
            />
          </g>
        </svg>
      </Vis>
    </VisBox>
  );
};

export default Vis10;
