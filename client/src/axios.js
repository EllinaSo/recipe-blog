import Axios from 'axios';
import { configure } from 'axios-hooks';

export default function bootstrap() {
  const axios = Axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'http://localhost:5000' : 'http://localhost:5000',
  });

  configure({ axios, defaultOptions: { manual: true } });
}
