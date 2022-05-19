import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./style";
import { returnStyle } from "../../shared/helpers/general";
import Icon from "../Icon";
import Colors from "../../constants/Colors";
import { scale } from "react-native-size-matters";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function Button({
  sm,
  md,
  icon,
  children,
  iconSize,
  title,
  backgroundColor,
  textColor,
  onPress,
  disabled,
  style,
  fullWidth,
  give,
} = {}) {
  const container = returnStyle(
    [md, sm, !!icon, backgroundColor, disabled, fullWidth, style, give],
    [
      styles.mdContainer,
      styles.smContainer,
      styles.withIconContainer,
      { backgroundColor },
      { backgroundColor: Colors().primary2 },
      { width: "100%" },
      style,
      {
        width: scale(200),
        height: scale(40),
      },
    ]
  );
  const text = returnStyle(
    [md, sm, textColor],
    [styles.mdText, styles.smText, { color: textColor }]
  );
  const onPressEvent = () => {
    if (!disabled && onPress) onPress();
  };
  return (
    <TouchableOpacity
      style={[styles.container, ...container]}
      onPress={onPressEvent}
    >
      <Text style={[styles.text, ...text]}>{children || title}</Text>
      {icon ? (
        <View>
          <Icon
            name={icon}
            color={textColor || Colors().background}
            size={iconSize || 30}
          />
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

export const FloatingButton = ({ children, style, ...props }) => {
  const insets = useSafeAreaInsets();
  return (
    <Button
      {...props}
      style={[styles.floatingButton, { bottom: insets.bottom }, style]}
    >
      {children}
    </Button>
  );
};
