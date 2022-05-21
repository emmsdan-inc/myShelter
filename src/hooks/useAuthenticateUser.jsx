import React from 'react';
import { isExpired } from '../shared/helpers/general';
import Routes from '../navigation/Routes';
import useReduxState from './useReduxState';
import {
  rcFirstTimeUseSelector,
  rcUserTokenSelector,
  rcUserProfileSelector,
  rcUserProfileAtom,
} from '../store/redux/states';

export default function useAuthenticateUser(navigation, logout = false) {
  const [, setIsFirstTimeUse] = useReduxState(rcFirstTimeUseSelector);
  const [token, setAuthToken] = useReduxState(rcUserTokenSelector);
  const [profile, setUserProfile] = useReduxState(rcUserProfileAtom);
  const [isLoggedIn, setIsLoggedIn] = React.useState('loading');

  async function logUserOut() {
    await setAuthToken('');
    await setUserProfile({ ...profile, token: '', expires_at: null });
    navigation.navigate(Routes.Login);
  }

  React.useEffect(() => {
    if (!logout) return;
    logUserOut();
  }, [logout]);

  React.useEffect(() => {
    if (!token || !profile) {
      setIsLoggedIn('false');
      return;
    }
    if (!isExpired(profile.expires_at) && profile.expires_at) {
      setIsFirstTimeUse('true').then(r => {
        console.log('User is authenticated');
        setIsLoggedIn('true');
        navigation.navigate(Routes.Home);
      });
    } else {
      setIsLoggedIn('false');
    }
  }, []);

  async function successfulLogin(profile) {
    await setIsFirstTimeUse('true');
    await setAuthToken(profile.token);
    await setUserProfile(profile);
    if (profile.token) {
      navigation.navigate(Routes.Home);
    }
  }

  return [profile, successfulLogin, logUserOut, isLoggedIn];
}
