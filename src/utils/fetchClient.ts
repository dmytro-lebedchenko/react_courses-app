const BASE_URL = 'https://api.wisey.app/api/v1/core/preview-courses';

// eslint-disable-next-line max-len
export const API_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkOTRlNjg4NS1kM2U5LTQwY2EtYTVjYy01MDRkNjZlZDVlN2QiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2Nzg3MDQ3NjIsImV4cCI6MTY3OTYwNDc2Mn0.Qw3LF39CDp27ZxoGzt5rikJM_OTx0eNaoyFFLxxrXUM';

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
