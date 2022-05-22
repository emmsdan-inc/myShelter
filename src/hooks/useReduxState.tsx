import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import { updateSlice } from '../store/redux/global';

const getKey = rcObject =>
  typeof rcObject === 'object' ? get(rcObject, 'key', '') : rcObject;
const getFetchFunction = rcObject =>
  typeof rcObject === 'object' ? get(rcObject, 'get', v => v) : v => v;
const getUpdateFunc = rcObject =>
  typeof rcObject === 'object' ? get(rcObject, 'set', v => v) : v => v;

const getStore = (store, rcObject) => get(store, getKey(rcObject), store);
export const useStore = (rcObject, globalState = null) => {
  const dispatch = useDispatch();
  const store = useSelector(state =>
    getStore(globalState ? state[globalState] : state, rcObject),
  );
  const set = getUpdateFunc(rcObject);
  const update = async value => {
    if (!value) {
      return;
    }
    const newValue = await set(value);
    dispatch(updateSlice({ key: getKey(rcObject), value: newValue }));
  };
  return { state: getFetchFunction(rcObject)(store), update };
};

const useGlobalState = key => {
  const { state, update } = useStore(key, 'global');
  return [state, update];
};
export default useGlobalState;
