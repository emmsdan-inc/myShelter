import React from "react";
import { ScrollView } from "react-native";
import { BaseWrapper } from "../../components/Untils";
import { scale } from "react-native-size-matters";
import Spacer from "../../components/Spacer";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useRecoilState } from "recoil";
import { rcBottomTabHeightAtom } from "../../store/recoil/general";
import LiveEventPlaceholders from "../../components/LiveEventPlaceholders";
import ListHomeContent from "./ListHomeContent";
import $http from "../../services/api";

export default function HomeScreen({ navigation }) {
  const height = useBottomTabBarHeight();
  const [, setBottomTabHeight] = useRecoilState(rcBottomTabHeightAtom);
  React.useEffect(() => {
    setBottomTabHeight(height);
    $http.$__navigation = navigation;
  }, [height]);

  return (
    <ScrollView>
      <BaseWrapper
        style={{
          flexDirection: "row",
          paddingRight: scale(30),
          paddingLeft: scale(15),
        }}
      >
        <LiveEventPlaceholders navigation={navigation} />
      </BaseWrapper>
      <Spacer size={8} />

      <ListHomeContent navigation={navigation} />
      <Spacer size={20} />
    </ScrollView>
  );
}
