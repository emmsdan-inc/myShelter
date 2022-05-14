import * as React from "react";
import { ScrollView } from "react-native";
import { Text, View } from "../../components/Themed";

import { scale } from "react-native-size-matters";
import styles from "./style";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import data from "./data";
import { APPLICATION_NAME } from "../../constants/App";
import Spacer from "../../components/Spacer";
import FlexSpaceBetweenCenter, {
  BaseWrapper,
  OpenURLButton,
} from "../../components/Untils";
import Button, { FloatingButton } from "../../components/Button";
import { GetPrayerRequests } from "./PrayerRequest";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import env from "../../services/environment";
import Routes from "../../navigation/Routes";
import { TopHeader } from "../../components/NavTab/TabBar";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

export default function PrayerRequest({ navigation, route }) {
  const onCreatePrayer = () => {
    navigation.navigate(Routes.CreatePrayerRequest, {
      newPrayerId: Math.random(),
    });
  };
  return (
    <BaseWrapper style={{ flex: 1 }}>
      <TopHeader />
      <View style={{ paddingVertical: 20 }}>
        <GetPrayerRequests route={route} onCreatePrayer={onCreatePrayer} />
      </View>
      <Spacer size={8} />
      <FloatingButton onPress={onCreatePrayer}>
        <Ionicons name="add" size={24} color={Colors().background} />
      </FloatingButton>
    </BaseWrapper>
  );
}
