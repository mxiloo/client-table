import axios from 'axios';

export const config = {
  baseUrl: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
};

export async function getClients() {
  try {
    const response = await axios.get(`${config.baseUrl}/clients`, {
      headers: config.headers,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getClient(id: number) {
  try {
    const response = await axios.get(`${config.baseUrl}/clients/${id}`, {
      headers: config.headers,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}