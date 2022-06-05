import * as Notifications from 'expo-notifications';
import Toast from 'react-native-toast-message';
import { get } from 'lodash';

export const sendNotification = async (
  title: string,
  body: string,
  trigger: any = null,
) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger,
  });
};

export const toaster = (title, message: string, options = {}) => {
  Toast.show({
    ...options,
    text1: title,
    text2: message,
  });
};

export const getMixlrValues = data =>
  data &&
  data.is_live && data.streamUrl && {
    streamUrl: data.streamUrl,
    about_me: data.about_me,
    is_live: data.is_live,
    followers_count: data.followers_count,
    following_count: data.following_count,
    id: data.id,
    profile_image_url: data.profile_image_url,
    artwork_url: data.artwork_url,
    username: data.username,
    url: data.url,
  };

export const getYoutubeValues = data =>
  data &&
  data.id && {
    publishedAt: data.publishedAt,
    title: data.title,
    description: data.description,
    publishTime: data.publishTime,
    thumbnail: data.thumbnail || get(data, 'thumbnails.high.url'),
    id: data.id,
    channelTitle: data.channelTitle,
  };
