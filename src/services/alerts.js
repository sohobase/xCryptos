import { fetch } from './modules';
import { C } from '../config';

const { SERVICE: { API } } = C;

export default {
  async add(data) {
    return fetch(`${API}/alert`, { method: 'POST', body: JSON.stringify(data) });
  },

  async get(token) {
    return fetch(`${API}/alerts?token=${token}`);
  },

  async remove(data) {
    return fetch(`${API}/alert`, { method: 'DELETE', body: JSON.stringify(data) });
  },
};
