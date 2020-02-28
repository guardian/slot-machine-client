import { Metadata } from '../types';

const apiURL = 'https://contributions.guardianapis.com/epic';

export const getBodyEnd = (
  meta: Metadata,
  url: string = apiURL
): Promise<Response> => {
  const json = JSON.stringify(meta);
  return fetch(url, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: json
  });
};
