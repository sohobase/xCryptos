import { C } from '../config';

const ALERTS_ENDPOINT = 'https://xcryptos.glitch.me/alerts';
const { DEVELOPMENT } = C.NODE_ENV;

async function add(data) {
  if (process.env.NODE_ENV === DEVELOPMENT) return data;

  const response = await fetch(ALERTS_ENDPOINT, { // eslint-disable-line
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();

  return json;
}

async function get(token) {
  if (process.env.NODE_ENV === DEVELOPMENT) return [];

  const response = await fetch(`${ALERTS_ENDPOINT}?token=${token}`); // eslint-disable-line
  const json = await response.json();

  return json;
}

async function remove(data) {
  if (process.env.NODE_ENV === DEVELOPMENT) return data;

  const response = await fetch(ALERTS_ENDPOINT, { // eslint-disable-line
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();

  return json;
}

export default {
  add,
  get,
  remove,
};
