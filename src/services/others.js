import $http from './api';
import { Alert } from 'react-native';
import startCase from 'lodash/startCase';
import { toaster } from '../shared/helpers/func';

export const prayerAndTestimoniesActions =
  (cb = () => {}) =>
  (id, type = 'testimony', action = 'share') => {
    console.log('prayerAndTestimoniesActions', id, type, action);
    const messageObj = {
      'testimony-share': {
        title: 'Send Testimony',
        body: 'Share your testimony with the church',
      },
      'prayer-request-share': {
        title: 'Send Prayer request',
        body: 'Do you want to share this prayer request with the Prayer Team',
      },
      'testimony-delete': {
        title: 'Delete this Testimony',
        body: 'Are you sure you want to delete this testimony?',
      },
      'prayer-request-delete': {
        title: 'Delete this Prayer request',
        body: 'Are you sure you want to delete this prayer request?',
      },
    };

    const message =
      messageObj[`${type}-${action}`] || messageObj['testimony-share'];
    Alert.alert(message.title, message.body, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
      },
      {
        text: startCase(`Yes ${action}`),
        onPress: async () => {
          const url = `${type}/${action}/${id}`;
          try {
            const resp = await $http.get(url);
            cb(resp);
            if (action === 'share') {
              toaster(
                startCase(`${type}`),
                `Thank you for sharing your ${startCase(`${type}`)}`,
              );
            } else {
              toaster(
                startCase(`${type}`),
                `${startCase(`${type}`)} deleted successfully`,
              );
            }
            return resp.data;
          } catch (err) {
            console.warn(err.response.data, { url });
            cb(null, err.response.data);
          }
        },
      },
    ]);
  };

export async function create(url, data) {
  try {
    const resp = await $http.post(url, data);
    return resp.data;
  } catch (error) {
    console.error(error, { url, data }, 'response');
    throw error?.response?.data || error.message;
  }
}

export async function update(url, data) {
  try {
    const resp = await $http.put(url, data);
    return resp.data;
  } catch (error) {
    console.error(error?.response, 'na error');
    throw error?.response?.data || error.message;
  }
}
