import React from 'react';
import { scaleLinear, line, max } from 'd3';
import { Fragment } from 'react';

const margin = {
  top: 60,
  bottom: 60,
  left: 0,
  right: 0,
};

//good resource: https://yangdanny97.github.io/blog/2019/03/01/D3-Spider-Chart
const Data = ({
  data,
  width,
  height,
  selectedNations,
  selectedYear,
  colors,
}) => {
  console.log(data);
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const selectedData = selectedNations.reduce((selectedData, nation) => {
    const relData = data.find(
      (dp) => dp.Country.trim('') === nation && dp.Year === selectedYear
    );
    if (relData) selectedData.push(relData);
    console.log(relData);
    return selectedData;
  }, []);
  const features = data.columns.slice(2);

  const radialVal = (nation) => {
    let max = 0;
    for (const p in nation) {
      if (!features.includes(p)) continue;
      const val = +nation[p];
      if (val > max) max = val;
    }
    return max;
  };
  const radialScale = scaleLinear()
    .domain([0, max(selectedData, radialVal)])
    .range([0, innerHeight / 2])
    .nice();
  // const scaleMin = radialScale.domain()[0];
  const scaleMax = radialScale.domain()[1];

  const angleToCoordinate = (angle, value) => {
    const x = Math.cos(angle) * radialScale(value);
    const y = Math.sin(angle) * radialScale(value);
    return { x: innerWidth / 2 + x, y: innerHeight / 2 - y };
  };

  const getPathCoordinates = (data_point) => {
    let coordinates = [];
    for (let i = 0; i < features.length; i++) {
      const ft_name = features[i];
      const angle = Math.PI / 2 + (2 * Math.PI * i) / features.length;
      coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
    }
    const ft_name = features[0];
    const angle = Math.PI / 2 + (2 * Math.PI * 0) / features.length;
    coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
    return coordinates;
  };

  return (
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      {features.map((feat, i) => {
        const angle = Math.PI / 2 + (2 * Math.PI * i) / features.length;
        const coords = angleToCoordinate(angle, scaleMax);
        const labelCoords = angleToCoordinate(angle, scaleMax + 4);
        return (
          <Fragment key={feat}>
            <line
              x1={innerWidth / 2}
              y1={innerHeight / 2}
              stroke='#ffffff6e'
              x2={coords.x}
              y2={coords.y}
            />
            <g transform={`translate(${labelCoords.x}, ${labelCoords.y})`}>
              <text fill='white' textAnchor='middle' fontSize={'12px'}>
                {feat}
              </text>
            </g>
          </Fragment>
        );
      })}
      {selectedData.map((d, i) => {
        const coords = getPathCoordinates(d);
        return (
          <path
            key={i}
            d={line()
              .x((d) => d.x)
              .y((d) => d.y)(coords)}
            fill={colors(d.Country)}
            stroke={colors(d.Country)}
            strokeWidth={2}
            strokeOpacity={1}
            fillOpacity={0.5}
          />
        );
      })}
      {radialScale.ticks().map((tick) => (
        <Fragment key={tick}>
          <circle
            cx={innerWidth / 2}
            cy={innerHeight / 2}
            r={radialScale(tick)}
            fill='none'
            stroke='#ffffff6e'
          />
          <text
            x={innerWidth / 2}
            y={innerHeight / 2 - radialScale(tick)}
            dy='-0.4em'
            dx='0.4em'
            fill='white'
            fontSize={'10px'}
          >
            {tick}
          </text>
        </Fragment>
      ))}
    </g>
  );
};

export default Data;
