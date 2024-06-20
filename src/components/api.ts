import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export async function get(url: string, params?: any) {
  try {
    const response = await api.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('Ошибка при выполнении GET-запроса:', error);
    throw error;
  }
}
