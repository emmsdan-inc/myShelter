import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom, selector } from "recoil";
import { APP_FIRST_TIME_USE } from "../../constants/User";

export const rcFirstTimeUseAtom = atom({
  key: "RCFirstTimeUse",
  default: false,
});
export const rcFirstTimeUseSelector = selector({
  key: "RCFirstTimeUse2",
  get: async () => await AsyncStorage.getItem(APP_FIRST_TIME_USE),
  set: (__, newValue) => {
    const value = JSON.stringify(!!newValue);
    AsyncStorage.setItem(APP_FIRST_TIME_USE, value);
    __.set(rcFirstTimeUseAtom, !!newValue);
  },
});

export const rcBottomTabHeightAtom = atom({
  key: "RCBottomTabHeight",
  default: 80,
});

export const rcOpenMiniPlayerAtom = atom({
  key: "RCOpenMiniPlayer",
  default: false,
});

export const rcNavigatorAtom = atom({
  key: "RCNavigator",
  default: {},
});
// export const rcFirstTimeUseSelector = selector({
//   key: "RCFirstTimeUse2",
//   get: async () => await AsyncStorage.getItem(APP_FIRST_TIME_USE),
//   set: (__, newValue) => {
//     const value = JSON.stringify(!!newValue);
//     AsyncStorage.setItem(APP_FIRST_TIME_USE, value);
//     __.set(rcFirstTimeUseAtom, !!newValue);
//   },
// });
