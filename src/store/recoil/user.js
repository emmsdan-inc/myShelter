import AsyncStorage from '@react-native-async-storage/async-storage';
import { atom, selector, SetRecoilState } from 'recoil';
import { PROFILE, TOKEN } from '../../constants/User';

export const rcUserProfileAtom = atom({
  key: 'RCUserProfile',
  default: {},
});

export const rcUserProfileSelector = selector({
  key: 'RCUserProfile2',
  get: async ({ get }) => {
    const profile = get(rcUserProfileAtom);
    const value = Object.keys(profile).length
      ? profile
      : JSON.parse((await AsyncStorage.getItem(PROFILE)) || '{}');
    AsyncStorage.setItem(PROFILE, JSON.stringify(value));
    return { ...(value || {}), saved: true };
  },
});

export const rcUserTokenAtom = atom({
  key: 'RCUserToken',
  default: '',
});
export const rcUserTokenSelector = selector({
  key: 'RCUserToken2',
  get: async () => await AsyncStorage.getItem(TOKEN),
  // @ts-ignore
  set: ({ set }, newValue) => {
    AsyncStorage.setItem(TOKEN, newValue);
    set(rcUserTokenAtom, newValue);
  },
});
