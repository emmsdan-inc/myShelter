const hiddenMediaRoutes = [
  'OnBoarding',
  'Login',
  'Register',
  'Forgot Password',
  'Change Password',
  'Activation Page',
  'Discovery',
  'Discover',
  'NotFound',
  '__$Media Player',
  '__$Live Video Player',
  '__$Mixlr Media Player',
  '__$Create Prayer Request',
  '__$Create Testimony',
];
const pausedMediaRoutes = ['__$Live Video Player', '__$Mixlr Media Player'];
export const rcFirstTimeUseAtom = 'rcFirstTimeUseAtom';
export const rcOpenMiniPlayerAtom = {
  key: 'rcOpenMiniPlayerAtom',
  value: hiddenMediaRoutes,
  get() {
    return (routeName, pause = false) => {
      const isHidden =
        hiddenMediaRoutes.findIndex(route => route === routeName) !== -1;
      const isPaused =
        pausedMediaRoutes.findIndex(route => route === routeName) !== -1;
      return {
        hide: !isHidden,
        pause: !(pause && isPaused),
        routeName,
      };
    };
  },
};
export const rcBottomTabHeightAtom = 'rcBottomTabHeightAtom';
export const rcNavigatorAtom = 'rcNavigatorAtom';
export const rcFirstTimeUseSelector = rcFirstTimeUseAtom;

export const rcUserTokenAtom = 'rcUserTokenAtom';
export const rcUserTokenSelector = {
  key: rcUserTokenAtom,
  value: '',
};

export const rcUserProfileAtom = 'rcUserProfileAtom';
export const rcUserProfileSelector = {
  key: rcUserProfileAtom,
};

export const rcMediaPlaybackStatusUpdateAtom =
  'rcMediaPlaybackStatusUpdateAtom';

export const rcMediaPlayObjectAtom = 'rcMediaPlayObjectAtom';

export const rcMediaObjectAtom = 'rcMediaObjectAtom';

export const rcMediaCurrentlyPlayingAtom = 'rcMediaCurrentlyPlayingAtom';

export const rcMediaCurrentlyPlayingSelector = rcMediaCurrentlyPlayingAtom;

export const rcMediaLiveEventAtom = {
  key: 'rcMediaLiveEventAtom',
  value: {},
};
export const rcMediasAtom = 'rcMediasAtom';

export const rcMediaAllMediaSelector = rcMediasAtom;

export const rcGetMediaOrAPISelectorFamily = rcMediaAllMediaSelector;
export const rcGetMediaOrAPISelector = rcMediaAllMediaSelector;
