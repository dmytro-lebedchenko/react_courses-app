import { API_TOKEN, BASE_URL } from "../app/consts";

type RequestMethod = 'GET';

async function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: unknown = null,
): Promise<T> {
  const options: RequestInit = {
    method,
    headers: {
      Authorization: API_TOKEN,
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json;',
    };
  }

  const response = await fetch(
    `${BASE_URL}${url}`,
    { ...options },
  );

  if (!response.ok) {
    throw new Error();
  }

  return response.json();
}

export const client = {
  get: <T>(url: string) => request<T>(url),
};
