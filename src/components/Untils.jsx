import React from "react";
import { ScrollView, TouchableOpacity, View, Linking } from "react-native";
import styles from "./style";
import { scale } from "react-native-size-matters";

export default function FlexSpaceBetweenCenter({
  children,
  style,
  onPress,
  activeOpacity,
}) {
  const styles = [
    {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    style,
  ];
  return !onPress ? (
    <View style={styles}>{children}</View>
  ) : (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={onPress}
      style={styles}
    >
      {children}
    </TouchableOpacity>
  );
}

export function FlexSpaceBetween({ children, style, onPress, activeOpacity }) {
  const styles = [
    {
      flexDirection: "row",
      alignItems: "center",
    },
    style,
  ];
  return !onPress ? (
    <View style={styles}>{children}</View>
  ) : (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={onPress}
      style={styles}
    >
      {children}
    </TouchableOpacity>
  );
}

export function FlexCenter({
  children,
  style,
  onPress,
  activeOpacity,
  flexDirection = "column",
}) {
  const styles = [
    {
      flexDirection,
      justifyContent: "center",
    },
    style,
  ];
  return !onPress ? (
    <View style={styles}>{children}</View>
  ) : (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={onPress}
      style={styles}
    >
      {children}
    </TouchableOpacity>
  );
}

export const BaseWrapper = ({
  children,
  style,
  component: Component,
  ...props
}) => {
  return Component ? (
    <Component {...props} style={[styles.baseWrapper, style]}>
      {children}
    </Component>
  ) : (
    <View {...props} style={[styles.baseWrapper, style]}>
      {children}
    </View>
  );
};

export const HorizontalScroll = ({ children, style }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={[{ paddingLeft: scale(16) }, style]}
  >
    {children}
    <View style={{ paddingRight: scale(26) }} />
  </ScrollView>
);

export const OpenURLButton = ({ url, children }) => {
  const handlePress = React.useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return children({ onPress: handlePress });
};
