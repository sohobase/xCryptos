import { Permissions, Notifications } from 'expo';

const { NOTIFICATIONS } = Permissions;
const GRANTED = 'granted';

export default {
  async getToken() {
    const { existingStatus } = await Permissions.getAsync(NOTIFICATIONS);
    let finalStatus = existingStatus;
    let token;

    if (existingStatus !== GRANTED) {
      const { status } = await Permissions.askAsync(NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus === GRANTED) token = await Notifications.getExpoPushTokenAsync();

    return token;
  },
};
