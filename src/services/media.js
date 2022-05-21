import $http from './api';

export async function searchService(page, params) {
  try {
    const search = await $http.get(page, { params });
    return search.data;
  } catch (error) {
    return error?.response?.data || error.message;
  }
}

export async function getLiveEventService() {
  try {
    const event = await $http.get('event/live');
    return event.data;
  } catch (error) {
    return error?.response?.data || error.message;
  }
}
