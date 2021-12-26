import React, { useState, useEffect } from 'react';
import { csv, scaleLinear, extent, scaleBand, format} from 'd3';
import './App.css';
import { AxisLeft } from './axisLeft';
import { AxisBottom } from './axisBottom';
import { Marks } from './marks';



const csvUrl = 'https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/7d4c3914cc6a29a7f5165f7d5d82b735d97bcfe4/week_temperature_sf.csv';

const width = 960;
const height = 500;
const margin = { top: 20, right: 30, bottom: 65, left: 220};
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;

function App() {

  const [data, setData] = useState(null);

  useEffect(() => {
      const row = d => {
        d.sepal_length = +d.sepal_length; 
        d.sepal_width = +d.sepal_width;
        d.petal_length = +d.petal_length;
        d.petal_width = +d.petal_width;
        return d;
      };
      csv(csvUrl, row).then(setData);
  }, [])

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xValue = d => d.petal_length;
  const xAxisLabel = 'Petal Length';

  const yValue = d => d.sepal_width;
  const yAxisLabel = 'Sepal Width';

  const siFormat = format('.2s');
  const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B');


  const xScale = scaleLinear()
  .domain(extent(data, xValue))
  .range([0, innerWidth])
  .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight])
    .nice();
  
  return  (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={5}
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
          tickOffset={5}
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
          circleRadius={7}
        />
      </g>
    </svg>
  )
}

export default App;
