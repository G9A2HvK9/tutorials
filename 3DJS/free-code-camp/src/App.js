import React, { useState } from 'react';
import { scaleLinear, extent, format } from 'd3';
import './App.css';
import { useData } from './useData'
import { AxisLeft } from './axisLeft';
import { AxisBottom } from './axisBottom';
import { Marks } from './marks';
import { Dropdown } from './dropdown';

const width = 960;
const menuHeight = 75;
const height = 500 - menuHeight;
const margin = { top: 20, right: 30, bottom: 65, left: 220};
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;


const attributes = [
  {value: 'sepal_length', label: 'Sepal Length'},
  {value: 'sepal_width', label: 'Sepal Width'},
  {value: 'petal_length', label: 'Petal Length'},
  {value: 'petal_width', label: 'Petal Width'},
  {value: 'species', label: 'Species'}
]

const getLabel = value => {
  for (let i = 0; i < attributes.length; i++){
    if(attributes[i].value === value){
      return attributes[i].label
    }
  }
}

function App() {

  const data = useData()

  const initialXAttribute = 'petal_length';
  const [xAttribute, setXAttribute] = useState(initialXAttribute);
  const xValue = d => d[xAttribute];
  const xAxisLabel = getLabel(xAttribute);
  
  const initialYAttribute = 'sepal_width';
  const [yAttribute, setYAttribute] = useState(initialYAttribute);
  const yValue = d => d[yAttribute];
  const yAxisLabel = getLabel(yAttribute);

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

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
    <>
      <label for="x-select">X:</label>
      <Dropdown 
        id="x-select" 
        options={attributes}
        selectedValue={xAttribute}
        onSelectedValueChange={setXAttribute}
      />
      <label for="y-select">Y:</label>
      <Dropdown 
        id="y-select" 
        options={attributes}
        selectedValue={yAttribute}
        onSelectedValueChange={setYAttribute}
      />
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
            circleRadius={3}
          />
        </g>
      </svg>
    </>
  )
}

export default App;
