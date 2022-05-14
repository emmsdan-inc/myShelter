import * as React from "react";
import { View } from "../../components/Themed";

import Spacer from "../../components/Spacer";
import { BaseWrapper } from "../../components/Untils";
import { FloatingButton } from "../../components/Button";
import { GetTestimony } from "./Testimony";
import Routes from "../../navigation/Routes";
import { TopHeader } from "../../components/NavTab/TabBar";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

export default function Testimony({ navigation, route }) {
  const onCreateTestimony = () => {
    navigation.navigate(Routes.CreateTestimony, {
      newTestimonyId: Math.random(),
    });
  };
  return (
    <BaseWrapper style={{ flex: 1 }}>
      <TopHeader title={"Testimony"} />

      <View style={{ paddingVertical: 20 }}>
        <GetTestimony route={route} onCreateTestimony={onCreateTestimony} />
      </View>

      <Spacer size={8} />

      <FloatingButton onPress={onCreateTestimony}>
        <Ionicons name="add" size={24} color={Colors().background} />
      </FloatingButton>
    </BaseWrapper>
  );
}
