import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom, selector, selectorFamily } from "recoil";
import { ALL_MEDIAS_IN_STORE, CURRENTLY_PLAYING } from "../../constants/Media";
import { searchService } from "../../services/media";

export const rcMediaPlayObjectAtom = atom({
  key: "RCMediaPlayObject",
  default: {},
});

export const rcMediaObjectAtom = atom({
  key: "RCMediaObject",
  default: {},
});

export const rcMediaPlaybackStatusUpdateAtom = atom({
  key: "RCMediaPlaybackStatusUpdate",
  default: {},
});

export const rcMediaCurrentlyPlayingAtom = atom({
  key: "RCMediaCurrentlyPlaying",
  default: {},
});
export const rcMediaCurrentlyPlayingSelector = selector({
  key: "RCMediaCurrentlyPlayingSelector",
  get: async ({}) =>
    JSON.parse((await AsyncStorage.getItem(CURRENTLY_PLAYING)) || "{}"),
  set: (__, newValue) => {
    const value = JSON.stringify(newValue);
    AsyncStorage.setItem(CURRENTLY_PLAYING, value);
    __.set(rcMediaCurrentlyPlayingAtom, newValue);
  },
});

export const rcMediaLiveEventAtom = atom({
  key: "RCMediaLiveEvent",
  default: { youtube: null, mixlr: null, lastCheck: null },
});

export const rcMediasAtom = atom({
  key: "RCMediasAtom",
  default: null,
});

export const rcMediaAllMediaSelector = selector({
  key: "RCMediaAllMediaSelector",
  get: async ({ get }) => {
    const atomMedia = await get(rcMediasAtom);
    const medias = await AsyncStorage.getItem(ALL_MEDIAS_IN_STORE);
    const values =
      typeof atomMedia === "string" ? JSON.parse(atomMedia) : atomMedia;
    return values || JSON.parse(medias || "{}");
  },
  set: (__, newValue) => {
    const atomV = __.get(rcMediasAtom);
    const values = typeof atomV === "string" ? JSON.parse(atomV) : atomV;
    let newValues = {};
    if (Array.isArray(newValue)) {
      newValues = Object.assign(
        {},
        values,
        newValue.reduce(
          (obj, data) => ({
            ...obj,
            [data.id]: {
              ...data,
              id: data.id,
              url: data.url,
              title: data.title,
              artist: data.author,
              artwork: data.thumbnail_url,
            },
          }),
          {}
        )
      );
    } else {
      newValues = Object.assign({}, values, newValue);
    }
    const value = JSON.stringify(newValues);
    AsyncStorage.setItem(ALL_MEDIAS_IN_STORE, value);
    __.set(rcMediasAtom, value);
  },
});

export const rcGetMediaOrAPISelectorFamily = selector({
  key: "RCGetMediaOrAPISelectorFamily ",
  get:
    ({ get }) =>
    async (id) => {
      try {
        const medias = await get(rcMediaAllMediaSelector);
        const media = medias[id];
        if (media) {
          return media;
        }
        const getMedia = await searchService("media/" + id, {});
        if (getMedia && getMedia.length > 0) {
          return getMedia[0];
        }
        throw { error: "Could not fetch media" };
      } catch (error) {
        console.log("error---p", await error);
        throw error;
      }
    },
});

export const rcGetMediaOrAPISelector = selector({
  key: "RCGetMediaOrAPISelector",
  get: async ({ get }) =>
    get(rcGetMediaOrAPISelectorFamily(get(rcMediaAllMediaSelector))),
});
