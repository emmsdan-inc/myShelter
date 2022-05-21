import { createSlice } from '@reduxjs/toolkit';
import * as states from './states';
import { mapStatesKeysToObject } from '../../shared/helpers/general';

export const globalStore = createSlice({
  name: 'store',
  initialState: mapStatesKeysToObject(states),
  reducers: {
    update: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { update: updateSlice } = globalStore.actions;
export default globalStore;
