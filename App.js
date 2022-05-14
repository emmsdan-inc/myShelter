import 'react-native-gesture-handler';
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator} from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./src/hooks/useCachedResources";
import Navigation from "./src/navigation";
import {RecoilRoot} from "recoil";
import MediaPlayer from "./src/components/Audio/BottomMediaPlayer";
import "./src/shared/helpers/init"
import useTrackPlayer from "./src/hooks/useTrackPlayer";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const { setup } =useTrackPlayer();
  
  React.useEffect(() => {
    if (isLoadingComplete) {
      setup();
    }
  } , [isLoadingComplete]);
  if (!isLoadingComplete) {
    return <ActivityIndicator  />;
  } else {
    return (
      <SafeAreaProvider>
        <RecoilRoot>
          <React.Suspense fallback={<ActivityIndicator />}>
            <Navigation />
            <MediaPlayer />
            <StatusBar />
          </React.Suspense>
        </RecoilRoot>
      </SafeAreaProvider>
    );
  }
}
