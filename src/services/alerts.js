const ALERTS_ENDPOINT = 'http://localhost:3000/alerts';

export default function(data) {
  return fetch(ALERTS_ENDPOINT, { // eslint-disable-line
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  });
}
