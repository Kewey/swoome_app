import { getCurrentUser, setNotification } from '@redux/user.reducer'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'
import { store } from './apiService'
import { setExpoToken } from './userService'

export async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) return

  const { status: existingStatus } = await Notifications.getPermissionsAsync()
  let finalStatus = existingStatus
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync()
    finalStatus = status
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!')
    return
  }

  const { data } = await Notifications.getExpoPushTokenAsync()
  store.dispatch(setNotification(data))
  try {
    if (!getCurrentUser(store.getState())?.id) return
    await setExpoToken(getCurrentUser(store.getState())?.id || '', data)
  } finally {
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        lightColor: '#FF231F7C',
      })
    }
  }

  return data
}
