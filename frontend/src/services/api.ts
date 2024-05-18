import axios from 'axios';

export type ApiResponse<T> = {
  success: boolean;
  statusCode: number;
  result: T;
  message: string;
};

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export default api;
