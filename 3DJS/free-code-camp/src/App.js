import React, { useState } from 'react';
import { scaleLinear, extent, timeFormat, scaleTime, bin, timeMonths, sum, max} from 'd3';
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
  {value: 'Reported Date', label: 'Reported Date'},
  {value: 'Total Dead and Missing', label: 'Total Dead and Missing'}
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

  const initialXAttribute = 'Reported Date';
  const [xAttribute, setXAttribute] = useState(initialXAttribute);
  const xValue = d => d[xAttribute];
  const xAxisLabel = getLabel(xAttribute);
  
  const initialYAttribute = 'Total Dead and Missing';
  const [yAttribute, setYAttribute] = useState(initialYAttribute);
  const yValue = d => d[yAttribute];
  const yAxisLabel = getLabel(yAttribute);

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xAxisTickFormat = timeFormat('%Y');

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const [start, stop] = xScale.domain()

  const binnedData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(timeMonths(start, stop))(data)
    .map(array => ({
      y: sum(array, yValue),
      x0: array.x0,
      x1: array.x1
    }))

  const yScale = scaleLinear()
    .domain([0, max(binnedData, d => d.y )])
    .range([innerHeight, 0])
    .nice();
  
  return  (
    <>
      <label htmlFor="x-select">X:</label>
      <Dropdown 
        id="x-select" 
        options={attributes}
        selectedValue={xAttribute}
        onSelectedValueChange={setXAttribute}
      />
      <label htmlFor="y-select">Y:</label>
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
            binnedData={binnedData}
            xScale={xScale}
            yScale={yScale}
            toolTipFormat={xAxisTickFormat}
            innerHeight={innerHeight}
          />
        </g>
      </svg>
    </>
  )
}

export default App;
