import axios from 'axios';
import { Termine, TermineGetResponse } from '../api/types';

const API_URL = 'http://localhost:8080/api/termine';

export async function loadTermine() {
    const serverResponse = await axios.get<TermineGetResponse>(API_URL);
    console.log('Response', serverResponse.data.result);
  }

  // https://www.youtube.com/watch?v=lmyKHYmgUYc
