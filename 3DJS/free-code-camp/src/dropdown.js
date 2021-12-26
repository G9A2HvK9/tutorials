import React from "react";

const options = [
  {value: 'goldfish', label: 'Goldfish'},
  {value: 'hamster', label:'Hamster'}
]

export const Dropdown = ({options, id}) => (
  <select id={id}>
    {options.map(({ value, label }) => (
      <option value={value}>{label}</option>
    ))}
  </select> 
);