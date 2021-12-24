import React, { useState, useEffect } from 'react';
import { csv, csvFormat } from 'd3';
import './App.css';


const csvUrl = 'https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/cssNamedColors.csv'; 


function App() {

  const [data, setData] = useState(null);

  useEffect(() => {
      csv(csvUrl).then(setData);
  }, [])

  const message = data => {
    let message = '';
    message = message + Math.round(csvFormat(data).length / 1024) + ' kb\n';
    message = message + data.length + ' rows\n';
    message = message + data.columns.length + ' columns';
    return message
  }

  return (
    <div>
    <h1>Using D3 with React</h1>
    <pre>{data ? message(data) : 'Loading...'}</pre>
    </div>
  );
}

export default App;
