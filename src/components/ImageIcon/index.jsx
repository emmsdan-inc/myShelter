import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { scale } from "react-native-size-matters";

const iconMap = {
  close: require("../../../assets/images/icon/Close.png"),
  menu: require("../../../assets/images/icon/Menu.png"),
  notification: require("../../../assets/images/icon/Notification.png"),
  mixlrWhite: require("../../../assets/images/icon/Mixlr-White.png"),
  search: require("../../../assets/images/icon/Search.png"),
};

const ImageIcon = ({ name, size, style, source, onPress } = {}) => (
  <TouchableOpacity onPress={onPress} activeOpacity={onPress ? 0.4 : 0}>
    <Image
      // @ts-ignore
      source={iconMap[name] || source}
      style={[
        { width: scale(size), height: scale(size), borderWidth: 0 },
        style,
      ]}
      resizeMode="contain"
    />
  </TouchableOpacity>
);

export default React.memo(ImageIcon);
