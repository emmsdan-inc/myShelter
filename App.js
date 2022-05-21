import 'react-native-gesture-handler';
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator} from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./src/hooks/useCachedResources";
import Navigation from "./src/navigation";
import "./src/shared/helpers/init"
import useTrackPlayer from "./src/hooks/useTrackPlayer";
import { Provider } from "react-redux";
import Toast from 'react-native-toast-message';
// REDUX-PERSIST
import {PersistGate} from 'redux-persist/integration/react';

import { fetchAll, store, persistor } from "./src/store/redux";
import Colors from "./src/constants/Colors";
import { View } from "./src/components/Themed";
import { Loading } from "./src/components/Untils";


export default function App() {
  const isLoadingComplete = useCachedResources();
  const { setup } =useTrackPlayer();
  
  React.useEffect(() => {
    if (isLoadingComplete) {
      setup();
      fetchAll()
    }
  } , [isLoadingComplete]);
  if (!isLoadingComplete) {
    return <Loading  />;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate  loading={<Loading />} persistor={persistor}>
            
            <Navigation />
            <Toast />
            <StatusBar />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    );
  }
}
