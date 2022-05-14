import React from "react";
import { Animated } from "react-native";
import { scale } from "react-native-size-matters";

export default function SliderIndicator({ active, color }) {
  const [size] = React.useState(new Animated.Value(0));
  React.useEffect(() => {
    Animated.timing(size, {
      toValue: scale(active ? 43 : 6),
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [active]);
  return (
    <Animated.View
      style={{
        width: size,
        height: scale(6),
        backgroundColor: color,
        borderRadius: 300,
      }}
    />
  );
}
