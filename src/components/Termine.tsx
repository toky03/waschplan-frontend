import React from 'react';
import { useSelector } from 'react-redux';

const Termine = () => {
  const termine = useSelector((state: any) => state.termine);
  return (
    <ul>
      {termine.map((termin: any) => <li  key={termin.id}>{termin.name} {termin.date}</li>)}
    </ul>
  )
};
  
export default Termine;
