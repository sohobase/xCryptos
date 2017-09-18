const ENDPOINT = 'https://xcryptos.glitch.me/alerts';
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export default {
  async add(data) {
    const response = await fetch(ENDPOINT, { // eslint-disable-line
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    return response.json();
  },

  async get(token) {
    const response = await fetch(`${ENDPOINT}?token=${token}`); // eslint-disable-line
    return response.json();
  },

  async remove(data) {
    const response = await fetch(ENDPOINT, { // eslint-disable-line
      method: 'DELETE',
      headers,
      body: JSON.stringify(data),
    });

    return response.json();
  },
};
