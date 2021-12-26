import React, { useState, useEffect } from 'react';
import { csv, arc, pie} from 'd3';
import './App.css';

const csvUrl = 'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv'; 

const width = 960;
const height = 500;

const centerX = width/2;
const centerY = height/2;

const pieArc = arc()
  .innerRadius(0)
  .outerRadius(width)


function App() {

  const [data, setData] = useState(null);

  useEffect(() => {
      csv(csvUrl).then(setData);
  }, [])

  if (!data) {
    return <pre>Loading...</pre>;
  }


  const colorPie = pie()
    .value(1)
  
    return  (
    <svg width={width} height={height}>
      <g transform = {`translate(${centerX}, ${centerY})`}>
        {colorPie(data).map( d => (
          <path 
            fill = {d.data['RGB hex value']} 
            d ={pieArc(d)}
          />
        ))}
      </g>
    </svg>
  )
}

export default App;
