import { ladeTermine, clearStore } from '../actions'
import { Termin } from './types';

const API_URL = 'http://localhost:8080/api/termine';

export async function loadTermine(dispatch: any, getState: any) {
  dispatch(clearStore());
  const response = await fetch(API_URL);
  const termine = await response.json();
  termine?.forEach((termin: Termin) => {
    dispatch(ladeTermine(termin.id, termin.parteiId, termin.terminBeginn, termin.terminEnde))
  });

}

/* export const loadTermine = () => (dispatch: any) => {
  // dispatch(clearStore());
  fetch(API_URL)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      return Promise.reject('Unable to get -Termine- from the backend');
    }
  })
  .then((json) => {
    for(let i = 0; i < json.length; i++) {
      dispatch(ladeTermine(json[i].id, json[i].parteiId, json[i].terminBeginn, json[i].terminEnde));
    }
  })
} */
