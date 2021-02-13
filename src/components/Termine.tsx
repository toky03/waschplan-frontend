import { useSelector } from 'react-redux';

const Termine = () => {
  const termine = useSelector((state: any) => state.termine);
  return (
    <ul>
      {termine.map((termin: any) => <li  key={termin.id}>TerminId: {termin.id} ParteiId: {termin.parteiId} Beginn: {termin.beginn} Ende: {termin.ende}</li>)}
    </ul>
  )
};
  
export default Termine;