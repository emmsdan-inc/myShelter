import React from "react";
import {
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import globalStore, { updateSlice } from "./global";
import * as states from "./states";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {combineReducers} from 'redux';

export const fetchAll = async () => {
  try {
    // const keys = Object.keys(states);
    // const promises = keys.map(async (key) => {
    //   const state = states[key];
    //   if (state.get) {
    //     return store.dispatch(updateSlice({ key, value: await state.get() }));
    //   }
    //   return store.dispatch(updateSlice({ key, value: state.value }));
    // });
    // await Promise.all(promises);
  } catch (error) {
    console.warn(error);
  }
};

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
  blacklist: [],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    global: globalStore.reducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, "store/update"],
    },
  }),
});
export default store;
export const persistor = persistStore(store);
