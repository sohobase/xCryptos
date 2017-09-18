const ALERTS_ENDPOINT = 'http://localhost:3000/alerts';

async function add(data) {
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
  const response = await fetch(`${ALERTS_ENDPOINT}?token=${token}`); // eslint-disable-line
  const json = await response.json();

  return json;
}

async function remove(data) {
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
