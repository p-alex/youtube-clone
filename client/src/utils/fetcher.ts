import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export const fetcher = async <Body, Data>(
  url: string,
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
  body?: Body,
  accessToken?: string
) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken ? accessToken : ''}`,
    },
    credentials: 'include',
    body: JSON.stringify(body),
  });
  const data: Data = await response.json();
  return data;
};
