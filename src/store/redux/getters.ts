import { rcUserTokenAtom } from './states';
// get token from redux store
export const getToken = store => {
  try {
    return store.global[rcUserTokenAtom];
  } catch (e) {
    return null;
  }
};
