import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';
// const myToken = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN

export const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});
