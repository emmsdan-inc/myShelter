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
import Icon from "../../components/Icon";
import ImageIcon from "../../components/ImageIcon";
import Colors from "../../constants/Colors";
import useAuthenticateUser from "../../hooks/useAuthenticateUser";
import { NavigationProp } from "@react-navigation/native";
import Button from "../../components/Button";
import { GiveAccountInfo } from "./GiveComponents";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import env from "../../services/environment";

export default function GiveComponent({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingHorizontal: scale(32) }]}>
      <Text
        style={{
          marginTop: -scale(insets.top - 20),
          fontSize: scale(20),
          paddingBottom: scale(20),
          textAlign: "center",
        }}
      >
        Give Unto the Lord
      </Text>
      <ScrollView
        style={{ maxHeight: hp("70%"), paddingVertical: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat cras
          iaculis nunc urna tortor. Sed vitae id pellentesque venenatis egestas
          sociis ut lorem. Id sit curabitur leo mattis nec. Dignissim id in
          gravida interdum adipiscing integer elit nisl id.
        </Text>
        <Spacer size={8} />
        <GiveAccountInfo />
        <Spacer size={8} />
      </ScrollView>
      <View style={[styles.footer]}>
        <OpenURLButton url={env.paymentURL}>
          {({ onPress }) => (
            <Button give sm onPress={onPress}>
              Give
            </Button>
          )}
        </OpenURLButton>
      </View>
    </View>
  );
}
