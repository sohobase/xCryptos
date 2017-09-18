import { Permissions, Notifications } from 'expo';

const { NOTIFICATIONS } = Permissions;
const GRANTED = 'granted';

export default async function registerForPushNotificationsAsync() {
  const { existingStatus } = await Permissions.getAsync(NOTIFICATIONS);
  let finalStatus = existingStatus;

  if (existingStatus !== GRANTED) {
    const { status } = await Permissions.askAsync(NOTIFICATIONS);
    finalStatus = status;
  }
  if (finalStatus !== GRANTED) return undefined;

  const token = await Notifications.getExpoPushTokenAsync();

  return token;
}
