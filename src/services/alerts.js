import { fetch } from './modules';
import { C } from '../config';

const { SERVICE: { ALERTS } } = C;

export default {
  async add(data) {
    return fetch(ALERTS, { method: 'POST', body: JSON.stringify(data) });
  },

  async get(token) {
    return fetch(`${ALERTS}?token=${token}`);
  },

  async remove(data) {
    return fetch(ALERTS, { method: 'DELETE', body: JSON.stringify(data) });
  },
};
