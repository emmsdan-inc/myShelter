import React from "react";
import { View } from "react-native";

export default function Spacer({ size } = {}) {
  return <View style={{ padding: size || 10 }} />;
}
