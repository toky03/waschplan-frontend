import axios from 'axios';
import { Termine, TermineGetResponse } from '../api/types';

const API_URL = 'http://localhost:8080/api/termine';

export async function loadTermine() {
    const serverResponse = await axios.get<TermineGetResponse>(API_URL);
    return serverResponse.data.result;
  }