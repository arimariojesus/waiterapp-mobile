import axios from 'axios';

import { isAndroid } from '../constants';

export const baseURL = isAndroid
  ? 'http://10.0.2.2:3333'
  : 'http://localhost:3333';

export const api = axios.create({
  baseURL,
});
