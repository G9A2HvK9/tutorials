import React from 'react';
import { csv, scaleTime, scaleLinear, extent, format, timeFormat} from 'd3';
import './App.css';
import { useData } from './useData'
import { AxisLeft } from './axisLeft';
import { AxisBottom } from './axisBottom';
import { Marks } from './marks';
import { Dropdown } from './dropdown';

const width = 960;
const height = 500;
const margin = { top: 20, right: 30, bottom: 65, left: 220};
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;

function App() {

  const data = useData()

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xValue = d => d.timestamp;
  const xAxisLabel = 'Day of the Week';

  const yValue = d => d.temperature;
  const yAxisLabel = 'Temperature';

  const xAxisTickFormat = timeFormat("%a");


  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice();
  
  return  (
    <>
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={7}
        />
        <text
          className='axis-label'
          textAnchor='middle'
          transform={`translate(${-yAxisLabelOffset},${innerHeight / 2}) rotate(-90)`}
        >
          {yAxisLabel}
        </text>
        <AxisLeft 
          yScale={yScale}
          innerWidth={innerWidth}
          tickOffset={7}
        />
        <text
          className='axis-label'
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor='middle'
        >
          {xAxisLabel}
        </text>
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          toolTipFormat={xAxisTickFormat}
          circleRadius={2}
        />
      </g>
    </svg>
      <label for="pet-select">Choose a pet:</label>
      <Dropdown id="pet-select" options={options}/>
    </>
  )
}

export default App;
