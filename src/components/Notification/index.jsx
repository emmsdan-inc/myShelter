import React from "react";
import { View, Text } from "react-native";
import styles, { textStyles } from "./styles";

export default function Notification({
  visible,
  message,
  style,
  mode = "notification",
}) {
  return !!message && visible ? (
    <View style={[styles.container, styles[mode], style]}>
      <Text style={[textStyles.text, textStyles[mode]]}>{message}</Text>
    </View>
  ) : null;
}
