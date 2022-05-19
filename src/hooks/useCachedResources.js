import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import {
  Nunito_200ExtraLight,
  Nunito_200ExtraLight_Italic,
  Nunito_300Light,
  Nunito_300Light_Italic,
  Nunito_400Regular,
  Nunito_400Regular_Italic,
  Nunito_600SemiBold,
  Nunito_600SemiBold_Italic,
  Nunito_700Bold,
  Nunito_700Bold_Italic,
  Nunito_800ExtraBold,
  Nunito_800ExtraBold_Italic,
  Nunito_900Black,
  Nunito_900Black_Italic,
} from "@expo-google-fonts/nunito";
import {
  Lato_100Thin,
  Lato_100Thin_Italic,
  Lato_300Light,
  Lato_300Light_Italic,
  Lato_400Regular,
  Lato_400Regular_Italic,
  Lato_700Bold,
  Lato_700Bold_Italic,
  Lato_900Black,
  Lato_900Black_Italic,
} from "@expo-google-fonts/lato";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          shelter: require("../../assets/fonts/shelter.ttf"),
          fontello: require("../../assets/fonts/shelter.ttf"),
          Nunito_200ExtraLight,
          Nunito_200ExtraLight_Italic,
          Nunito_300Light,
          Nunito_Light: Nunito_300Light,
          Nunito_300Light_Italic,
          Nunito_400Regular,
          nunito: Nunito_400Regular,
          Nunito_400Regular_Italic,
          Nunito_600SemiBold,
          Nunito_600SemiBold_Italic,
          Nunito_700Bold,
          Nunito_Bold: Nunito_700Bold,
          Nunito_700Bold_Italic,
          Nunito_800ExtraBold,
          Nunito_800ExtraBold_Italic,
          Nunito_900Black,
          Nunito_900Black_Italic,

          Lato_100Thin,
          Lato_100Thin_Italic,
          Lato_300Light,
          Lato_Light: Lato_300Light,
          Lato_300Light_Italic,
          Lato_400Regular,
          lato: Lato_400Regular,
          Lato_Regular_Italic: Lato_400Regular_Italic,
          Lato_400Regular_Italic,
          Lato_700Bold,
          Lato_Bold: Lato_700Bold,
          Lato_700Bold_Italic,
          Lato_900Black,
          Lato_900Black_Italic,
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setTimeout(() => {
          setLoadingComplete(true);
          console.log("SplashScreen.hideAsync");
        }, 2000);
        await SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
