import { AsyncStorage } from 'react-native';

export default {

  async get(key) {
    const store = await AsyncStorage.getItem(key);
    return store ? JSON.parse(store) : undefined;
  },

  async set(key, value) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
};
