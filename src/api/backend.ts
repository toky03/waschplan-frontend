import { ladeTermine, clearStore } from '../actions'

const API_URL = 'http://localhost:8080/api/termine';

export const loadTermine = () => (dispatch: any) => {
  dispatch(clearStore());
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
}
