import React from "react";
import { isExpired } from "../shared/helpers/general";
import Routes from "../navigation/Routes";
import useReduxState from "./useReduxState";
import {
  rcFirstTimeUseSelector,
  rcUserTokenSelector,
  rcUserProfileSelector,
  rcUserProfileAtom,
} from "../store/redux/states";

export default function useAuthenticateUser(navigation, logout = false) {
  const [, setIsFirstTimeUse] = useReduxState(rcFirstTimeUseSelector);
  const [token, setAuthToken] = useReduxState(rcUserTokenSelector);
  const [profile, setUserProfile] = useReduxState(rcUserProfileAtom);

  async function logUserOut() {
    await setAuthToken("");
    await setUserProfile({ ...profile, token: "", expires_at: null });
    navigation.navigate(Routes.Login);
  }

  React.useEffect(() => {
    if (!logout) return;
    logUserOut();
  }, [logout]);

  React.useEffect(() => {
    if (!token || !profile) return;
    if (!isExpired(profile.expires_at) && profile.expires_at) {
      setIsFirstTimeUse("true").then((r) => {
        console.log("User is authenticated");
        navigation.navigate(Routes.Home);
      });
    }
  }, []);
  
  async function successfulLogin(profile) {
    await setIsFirstTimeUse("true");
    await setAuthToken(profile.token);
    await setUserProfile(profile);
    if (profile.token) {
      navigation.navigate(Routes.Home);
    }
  }

  return [profile, successfulLogin, logUserOut];
}
