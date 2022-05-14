import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { rcFirstTimeUseSelector } from "../store/recoil/general";
import {
  rcUserProfileAtom,
  rcUserProfileSelector,
  rcUserTokenSelector,
} from "../store/recoil/user";
import { isExpired } from "../shared/helpers/general";
import Routes from "../navigation/Routes";

export default function useAuthenticateUser(navigation, logout = false) {
  const [, setIsFirstTimeUse] = useRecoilState(rcFirstTimeUseSelector);
  const [token, setAuthToken] = useRecoilState(rcUserTokenSelector);
  const profile = useRecoilValue(rcUserProfileSelector);
  const [, setUserProfile] = useRecoilState(rcUserProfileAtom);

  function logUserOut() {
    setAuthToken("");
    setUserProfile({ ...profile, token: "", expires_at: null });
    navigation.navigate(Routes.Login);
  }

  React.useEffect(() => {
    if (!logout) return;
    logUserOut();
  }, [logout]);

  React.useEffect(() => {
    if (!token || !profile) return;
    if (!isExpired(profile.expires_at) && profile.expires_at) {
      setIsFirstTimeUse("true");
      navigation.navigate(Routes.Home);
    }
  }, []);

  function successfulLogin(profile) {
    setIsFirstTimeUse("true");
    setAuthToken(profile.token);
    setUserProfile(profile);
    if (profile.token) {
      navigation.navigate(Routes.Home);
    }
  }

  return [profile, successfulLogin, logUserOut];
}
