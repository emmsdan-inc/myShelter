import 'expo-asset';
import { registerRootComponent } from 'expo';

import App from './App';
import TrackPlayer from 'react-native-track-player';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as Notifications from 'expo-notifications';
// TrackPlayer.setupPlayer({})
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

TrackPlayer.registerPlaybackService(() =>
  require('./src/services/trackPlayer'),
);

ScreenOrientation.unlockAsync();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
Notifications.requestPermissionsAsync();
