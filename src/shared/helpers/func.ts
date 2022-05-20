import * as Notifications from 'expo-notifications';
import Toast from 'react-native-toast-message';

export const sendNotification = async (
  title: string,
  body: string,
  trigger: any=null,
) => {
    await Notifications.scheduleNotificationAsync({
        content: {
            title,
            body
        },
        trigger
    });
};

export const toaster = (title,message: string,options={}) => {
    Toast.show({
        ...options,
        text1: title,
        text2: message
    });
};
